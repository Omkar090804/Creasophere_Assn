from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAMPLE_XLSX = os.path.join(BASE_DIR, 'sample_data.xlsx')

class AnalyzeAPIView(APIView):

    def get(self, request):
        q = request.GET.get('q', '').strip()

        # Load Excel
        try:
            df = pd.read_excel(SAMPLE_XLSX)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

        # Normalize columns (lowercase)
        df.columns = [c.lower().strip() for c in df.columns]

        # --- Identify columns based on your Excel file ---
        area_col = "final location"
        year_col = "year"
        price_col = "flat - weighted average rate"
        demand_col = "total_sales - igr"

        # Validate all required columns exist
        missing = [c for c in [area_col, year_col, price_col, demand_col] if c not in df.columns]
        if missing:
            return Response({
                "error": "Missing expected columns in Excel.",
                "missing_columns": missing,
                "available_columns": list(df.columns)
            }, status=400)

        # --- Filter rows by location ---
        if q:
            filt = df[df[area_col].astype(str).str.contains(q, case=False, na=False)]
        else:
            filt = df

        # --- Chart Data ---
        chart = (
            filt.groupby(year_col)
            .agg(price_avg=(price_col, "mean"), demand_sum=(demand_col, "sum"))
            .reset_index()
            .to_dict(orient="records")
        )

        # --- Table rows ---
        rows = filt.to_dict(orient="records")

        # --- Summary ---
        if q and len(filt) > 0:
            summary = (
                f"Analysis for '{q}': "
                f"Average Price = {round(filt[price_col].mean(), 2)}, "
                f"Total Demand = {int(filt[demand_col].sum())}."
            )
        elif q:
            summary = f"No data found for '{q}'."
        else:
            summary = "General summary. Use ?q=<location> to filter."

        return Response({
            "summary": summary,
            "chart": chart,
            "rows": rows
        })

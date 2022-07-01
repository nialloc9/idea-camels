"""
Works out confidence for keyword to bid on
"""
def calculate_confidence(df):
    mapping = {
        "LOW": 1,
        "MEDIUM": 2,
        "HIGH": 3
    }

    mapped_competion = mapping[df["competition_value"]]

    average_cost = df["low_top_of_page_bid_micros"] + df["high_top_of_page_bid_micros"]

    return   (mapped_competion * (df["avg_monthly_searches"] * 1000000)) / average_cost
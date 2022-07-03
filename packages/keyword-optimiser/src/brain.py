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

    ctr_multipler = 1

    if df["existing_ctr"] > 0.1:
        ctr_multipler = 2

    if df["existing_ctr"] > 0.3:
        ctr_multipler = 3

    return   (mapped_competion * (df["avg_monthly_searches"] * 1000000 * ctr_multipler)) / average_cost

    
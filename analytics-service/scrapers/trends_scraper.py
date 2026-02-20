from pytrends.request import TrendReq

def get_trend_data(keyword):
    pytrends = TrendReq()
    pytrends.build_payload([keyword])
    data = pytrends.interest_over_time()
    return data.to_dict()
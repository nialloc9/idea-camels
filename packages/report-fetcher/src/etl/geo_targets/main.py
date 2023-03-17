import pandas

def transform_geo_targets(path="./raw/geo_targets.csv", destination="./curated/transformed_geo_targets.csv", country_codes=["US", "CA", "IE", "GB", "NZ"], target_types=["Country"]):
    print("Transforming {} file into {} using {} country codes to filter.".format(path, destination, country_codes))
    
    df = pandas.read_csv(path)

    df = df[df['Status'].isin(["Active"])]

    df = df[df["Country Code"].isin(country_codes)]
    df = df[df["Target Type"].isin(target_types)]
    
    df= df[["Criteria ID"]]

    df = df.rename(columns={"Criteria ID": "id"})
    df.to_csv(destination, index=False, sep=',')

    print("Successfully transformed {} file into {} using {} country codes to filter.".format(path, destination, country_codes))


transform_geo_targets()
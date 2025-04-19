import * as React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import { Providers } from "types/ProviderDetails";

interface ReportTemplateProps {
  currentDateTime: string;
  savedProviderDetails: Providers[];
  logo: string;
  caretype: string;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({
  currentDateTime = "",
  savedProviderDetails = [],
  logo = "",
  caretype = ""
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.category}>
            {caretype === "" ? "Skilled Nursing" : caretype}
          </Text>
          <Text style={styles.normalText}>
            Date of creation: {currentDateTime}
          </Text>
        </View>
      </View>
    </Page>
    {renderListPages(
      savedProviderDetails,
      caretype === "" ? "Skilled Nursing" : caretype
    )}
  </Document>
);

export default ReportTemplate;

const renderListPages = (
  savedProviderDetails: Providers[],
  caretype: string
) => {
  const pages = [];
  let index = 0;

  while (index < savedProviderDetails.length) {
    pages.push(
      <Page key={`page${pages.length + 1}`} style={styles.page2}>
        <View style={styles.container2}>
          {savedProviderDetails.slice(index, index + 4).map((provider) => (
            <View key={provider.code} style={styles.listContainer}>
              <Text style={styles.listTitle}>{provider.name}</Text>
              <Text style={styles.listCategory}>
                {provider.services.find((service) => service === caretype) ??
                  provider.services[0]}
              </Text>
              <View style={styles.imgTextCategory}>
                <Image
                  src={`${process.env.PUBLIC_URL}/building.png`}
                  style={styles.icons}
                />
                <Text style={styles.providerDetails}>
                  {provider.locations[0].address}, {provider.locations[0]?.city}
                  , {provider.locations[0]?.state},{" "}
                  {provider.locations[0]?.postalCode}
                </Text>
              </View>
              <View style={styles.providerContactAndMiles}>
                <View style={styles.imgTextCategory}>
                  <Image
                    src={`${process.env.PUBLIC_URL}/pin.png`}
                    style={styles.icons}
                  />
                  <Text style={styles.providerDetails}>
                    {provider.distanceInMiles} miles away
                  </Text>
                </View>
                {provider.phone && (
                  <View style={styles.imgTextCategory}>
                    <Image
                      src={`${process.env.PUBLIC_URL}/call.png`}
                      style={styles.icons}
                    />
                    <Text style={styles.providerDetails}>{provider.phone}</Text>
                  </View>
                )}
              </View>
              {provider.rating?.overall && provider.rating?.overall > 0 && (
                <View style={styles.imgTextCategory}>
                  {[...Array(provider.rating?.overall)].map((_, index) => (
                    <Image
                      key={index}
                      src={`${process.env.PUBLIC_URL}/star.png`}
                      style={styles.icons}
                    />
                  ))}
                  <Text style={styles.providerDetails}>
                    ({provider.rating?.overall})
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    );
    index += 4; // Adjust the number here based on how many providers fit on one page
  }
  return pages;
};

const styles = StyleSheet.create({
  page: {
    padding: "15px"
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    border: "1px solid #827d7d",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "190px"
  },
  heading: {
    width: "100%",
    // padding: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  },
  logo: {
    // height: "100px",
    width: "160px"
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  },
  category: {
    padding: "16px",
    borderRadius: "5px",
    backgroundColor: "#806fe4",
    color: "#FFF",
    fontWeight: 700,
    letterSpacing: "1px"
  },
  title: {
    fontWeight: 700,
    color: "#000",
    fontSize: "20px",
    letterSpacing: "1px"
  },
  dateSection: {
    width: "100%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  },
  normalText: {
    fontWeight: 500,
    color: "#000",
    fontSize: "16px",
    letterSpacing: "1px"
  },
  page2: {
    padding: "15px"
  },
  container2: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    border: "1px solid #827d7d",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "16px",
    gap: "16px"
  },
  listContainer: {
    width: "100%",
    borderBottom: "1px solid #827d7d",
    borderRadius: "0px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "16px"
  },
  listTitle: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#000",
    letterSpacing: "1px"
  },
  listCategory: {
    fontWeight: 700,
    fontSize: "9px",
    padding: "5px",
    backgroundColor: "#806fe4",
    color: "#FFF",
    letterSpacing: "1px",
    borderRadius: "5px"
  },
  imgTextCategory: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "5px"
  },
  icons: {
    height: "13px",
    width: "13px",
    color: "#2b37ae"
  },
  providerDetails: {
    fontWeight: 700,
    fontSize: "9px",
    color: "#000",
    letterSpacing: "1px"
  },
  providerContactAndMiles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "5px"
  }
});

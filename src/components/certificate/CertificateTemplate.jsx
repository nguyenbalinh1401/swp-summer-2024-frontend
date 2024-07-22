import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Svg,
  Image,
} from "@react-pdf/renderer";

const product = {
  owner: "9d5555e9-a683-4c79-9f35-39b408eed8eb",
  name: "Certina Watch",
  brand: "Certina",
  price: "423",
  description:
    "Certina Watch is a functional and very impressive automatic watch from Lac Leman collection. Case is made out of Stainless Steel, which stands for a high quality of the item while the dial colour is black.",
  type: "Automatic",
  image: "https://www.watchshop.com/images/products/86961001_l.jpg",
  dialColor: "Black",
  box: true,
  papers: false,
  waterResistance: 50,
  caseMaterial: "Stainless Steel",
  caseSize: 48,
  pastUsageTime: 1,
  yearOfProduction: 2024,
  remainingInsurance: 24,
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: 800,
    fontSize: 24,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    color: "red",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 16,
    border: 1,
  },
  field: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 16,
  },
  contentText: {
    fontSize: 16,
    fontFamily: "Verdana",
  },
  subText: {
    fontSize: 12,
    color: "#0C81BD",
  },
});

const MyPDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ marginHorizontal: "auto" }}>
          <Text style={styles.title}>CERTIFICATE OF APPRAISAL</Text>
        </View>
        <View style={styles.container}>
          <View style={{ border: 1, width: 600 }}>
            <View style={styles.field}>
              <Text style={styles.subText}>Watch name:</Text>
              <Text style={styles.contentText}>{product.name}</Text>
            </View>
          </View>
          <Image
            source={{ uri: product.image }}
            style={{ width: 400, height: 400 }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default function CertificateTemplate() {
  return (
    <div className="py-8">
      <PDFViewer width={720} height={640} showToolbar={false}>
        <MyPDF />
      </PDFViewer>
    </div>
  );
}

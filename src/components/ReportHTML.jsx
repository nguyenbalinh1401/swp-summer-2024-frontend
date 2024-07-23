import React from "react";
import dateFormat from "../assistants/date.format";
import CurrencySplitter from "../assistants/currencySpliter";

const ReportHTML = ({ productData }) => {
  if (!productData) {
    return null; // or return loading indicator or placeholder
  }
  const {
    name,
    brand,
    description,
    price,
    type,
    dialColor,
    box,
    paper,
    waterResistance,
    caseMaterial,
    caseSize,
    pastUsageTime,
    yearOfProduction,
    remainingInsurance,
    image,
    updatedAt,
  } = productData;

  const styles = {
    document: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      border: "1px solid #ccc",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#fff",
      color: "#000",
    },
    header: {
      display: "flex",
      flexDirection: "column", // Display items in column layout
      alignItems: "left", // Center align items horizontally
      marginBottom: "20px",
    },
    headerLogo: {
      display: "flex",
      flexDirection: "column", // Display items in column layout
      alignItems: "right", // Center align items horizontally
      marginBottom: "20px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "left",
    },
    logo: {
      width: "100px",
      height: "100px",
    },
    contactInfo: {
      marginBottom: "20px",
    },
    section: {
      display: "flex",
    },
    productInfo: {
      marginTop: "20px",
      marginBottom: "20px",
      flex: 1,
      marginRight: "20px",
    },
    productImage: {
      marginTop: "20px",
      marginBottom: "20px",
      width: "300px",
      height: "300px",
      alignSelf: "flex-start",
    },
    footer: {
      textAlign: "center",
    },
    center: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "15px",
    },
    centerHead: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "30px",
    },
    detailsContainer: {
      display: "flex",
      justifyContent: "space-between", // Align items to the left and right
      marginTop: "20px",
    },
    details: {
      flex: 1,
      marginRight: "20px",
      marginTop: "10px",
    },
    certifiedBy: {
      flex: 1,
    },
    left: {
      fontWeight: "bold",
    },
    left2: {
      marginLeft: "10px",
    },
    right: {
      fontWeight: "bold",
    },
    right2: {
      marginLeft: "10px",
    },
  };

  return (
    <div style={styles.document}>
      <div className="flex flex-row justify-between items-center text-xs pb-8">
        <div style={styles.header}>
          <div style={styles.title}>VINTAGE TIMEPIECE</div>
          <div style={styles.title}>VT Watch Inspection Center</div>
        </div>
        <div style={styles.headerLogo}>
          <div style={styles.logo}>
            <svg
              fill="currentColor"
              height="100"
              width="100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path
                  d="M432,256c0-40.625-15.228-77.755-40.264-106.002c-0.046-0.176-0.088-0.352-0.147-0.527l-20.353-61.06
		c-1.964-5.89-6.052-10.605-11.236-13.446V24c0-13.233-10.767-24-24-24H208c-13.233,0-24,10.767-24,24v50.964
		c-5.184,2.842-9.273,7.557-11.236,13.447l-20.353,61.06c-0.058,0.175-0.101,0.351-0.147,0.527
		c-14.734,16.624-26.072,36.322-32.905,58.002H104c-13.234,0-24,10.766-24,24v48c0,13.234,10.766,24,24,24h15.359
		c6.833,21.682,18.172,41.381,32.907,58.006c0.046,0.175,0.088,0.35,0.146,0.524l20.353,61.06
		c1.963,5.889,6.05,10.604,11.234,13.446V488c0,13.233,10.767,24,24,24h128c13.233,0,24-10.767,24-24v-50.963
		c5.186-2.842,9.275-7.558,11.238-13.448l20.354-61.06c0.059-0.176,0.102-0.354,0.148-0.531C416.774,333.752,432,296.624,432,256z
		 M187.942,93.471c1.091-3.272,4.141-5.471,7.59-5.471h100.465c4.418,0,8-3.582,8-8s-3.582-8-8-8H200V24c0-4.411,3.589-8,8-8h128
		c4.411,0,8,3.589,8,8v48h-15.999c-4.418,0-8,3.582-8,8s3.582,8,8,8h20.467c3.449,0,6.499,2.198,7.59,5.47l11.401,34.204
		C340.793,107.786,307.747,96,272,96c-35.747,0-68.793,11.786-95.459,31.674L187.942,93.471z M104,288c-4.411,0-8-3.589-8-8v-48
		c0-4.411,3.589-8,8-8h11.217c-2.108,10.343-3.217,21.044-3.217,32s1.109,21.657,3.217,32H104z M272,112
		c79.402,0,144,64.598,144,144s-64.598,144-144,144s-144-64.598-144-144S192.598,112,272,112z M356.059,418.53
		c-1.091,3.272-4.141,5.47-7.589,5.47h-20.467c-4.418,0-8,3.582-8,8s3.582,8,8,8H344v48c0,4.411-3.589,8-8,8H208
		c-4.411,0-8-3.589-8-8v-48h95.999c4.418,0,8-3.582,8-8s-3.582-8-8-8H195.534c-3.449,0-6.499-2.198-7.59-5.47l-11.401-34.202
		C203.209,404.214,236.254,416,272,416c35.749,0,68.795-11.787,95.461-31.676L356.059,418.53z"
                />
                <path
                  d="M272,384c70.58,0,128-57.42,128-128c0-27.96-8.854-54.524-25.606-76.82c-2.654-3.532-7.669-4.244-11.202-1.59
		c-3.532,2.654-4.244,7.669-1.59,11.202c13.046,17.362,20.599,37.692,22.103,59.208H376c-4.418,0-8,3.582-8,8s3.582,8,8,8h7.711
		c-3.929,55.394-48.317,99.782-103.711,103.711V360c0-4.418-3.582-8-8-8s-8,3.582-8,8v7.711
		c-55.394-3.929-99.782-48.317-103.711-103.711H168c4.418,0,8-3.582,8-8s-3.582-8-8-8h-7.711
		c3.929-55.394,48.317-99.782,103.711-103.711V152c0,4.418,3.582,8,8,8s8-3.582,8-8v-7.705c21.512,1.503,41.837,9.054,59.197,22.094
		c3.531,2.652,8.547,1.942,11.201-1.592c2.653-3.533,1.941-8.547-1.592-11.201C326.514,136.851,299.955,128,272,128
		c-70.58,0-128,57.42-128,128S201.42,384,272,384z"
                />
                <path
                  d="M272,176c-4.418,0-8,3.582-8,8v72c0,0.067,0.008,0.131,0.01,0.198c0.004,0.162,0.011,0.324,0.025,0.486
		c0.009,0.109,0.022,0.216,0.036,0.323c0.019,0.15,0.041,0.299,0.068,0.449c0.022,0.119,0.047,0.237,0.075,0.354
		c0.031,0.132,0.064,0.264,0.102,0.395c0.037,0.131,0.079,0.259,0.123,0.387c0.039,0.115,0.08,0.229,0.125,0.343
		c0.055,0.139,0.115,0.276,0.177,0.411c0.047,0.101,0.094,0.201,0.145,0.3c0.073,0.142,0.151,0.28,0.232,0.417
		c0.035,0.059,0.063,0.12,0.099,0.178l40,64c1.518,2.428,4.125,3.761,6.792,3.761c1.448,0,2.914-0.393,4.232-1.217
		c3.747-2.342,4.885-7.277,2.544-11.024L280,253.705V184C280,179.582,276.418,176,272,176z"
                />
              </g>
            </svg>
          </div>
        </div>

        <div style={styles.contactInfo}>
          <div>ADDRESS: 123 ACB STREETS ABC</div>
          <div>HOTLINES: 0999888777</div>
          <div>
            Website:{" "}
            <a href="http://vintageTimepiece.com">
              https://vintagetimepiece.com
            </a>
          </div>
          <div>Email: vintagetimepiece00@gmail.com</div>
        </div>
      </div>

      <h2 style={styles.centerHead}>CERTIFICATE OF AUTHENTICITY</h2>

      <div style={styles.section}>
        <div style={styles.productInfo}>
          <div>
            <span style={styles.left}>Name:</span> {name}
          </div>
          <div>
            <span style={styles.left}>Brand:</span> {brand}
          </div>
          <div>
            <span style={styles.left}>Price:</span> $
            {CurrencySplitter(Math.round(price * 100) / 100)}
          </div>
          <div>
            <span style={styles.left}>Type:</span> {type}
          </div>
          <div>
            <span style={styles.left}>Dial Color:</span> {dialColor}
          </div>
          <div>
            <span style={styles.left}>Water Resistance:</span> {waterResistance}{" "}
            mm
          </div>
          <div>
            <span style={styles.left}>Case Material:</span> {caseMaterial}
          </div>
          <div>
            <span style={styles.left}>Case Size:</span> {caseSize} mm
          </div>
          <div>
            <span style={styles.left}>Manufactured in:</span> {yearOfProduction}
          </div>
        </div>

        {image && <img style={styles.productImage} src={image} alt="Watch" />}
      </div>

      <div className="text-center text-xs mt-8">
        <div style={styles.center}>
          <strong>VT WATCH INSPECTION CENTER</strong>
        </div>
        <div style={styles.center}>
          <strong>CERTIFICATE OF AUTHENTICITY</strong>
        </div>
        <div style={styles.details}>
          This certificate is independently issued by VT Watch Inspection Center
          and is not authorized by any watch brands. It is provided based on the
          inspection results and evaluations conducted by our senior experts
          with extensive experience.
        </div>

        <div style={styles.detailsContainer}>
          <div style={styles.details}>
            <div style={styles.left}>Certification Details:</div>
            <div style={styles.left2}>
              Issuance Date: {dateFormat(updatedAt, "mmmm dd, yyyy")}
            </div>
            <div style={styles.left2}>Location: Ho Chi Minh City</div>
          </div>
          <div style={styles.certifiedBy}>
            <div style={styles.right}>Certified By:</div>
            <div style={styles.right2}>Head of Inspection Department</div>
            <div style={styles.right2}>VT Watch Inspection Center</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHTML;

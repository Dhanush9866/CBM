// Contact Offices Data Structure
// This file will store all office data for the Contact page
// Later this data will be moved to the database

export interface OfficeData {
  image_url?: string;
  region: string;
  country: string;
  office_name: string;
  address: string;
  phone: string;
  emails: string[];
  is_lab_facility: boolean;
  notes: string;
}

export interface RegionalOfficeGroup {
  region_name: string;
  offices: OfficeData[];
}

// Contact Offices Data
export const contactOfficesData: RegionalOfficeGroup[] = [
  {
    region_name: "Corporate Office",
    offices: [
      {
        region: "Corporate Office",
        country: "United Kingdom",
        office_name: "CBM 360 TIV – UK",
        address: "79 Denyer St, London SW3 2NY, UK",
        phone: "+44 7934 980214",
        emails: ["Support@cbm360tiv.com", "info@cbm360tiv.com"],
        is_lab_facility: false,
        notes: "Corporate Headquarters"
      }
    ]
  },
  {
    region_name: "Our Global Offices – Europe",
    offices: [
      {
        region: "Europe",
        country: "Germany",
        office_name: "CBM 360 TIV - Germany GmbH & Co. KG",
        address: "Hinter den Kirschkaten 69, 23560 Lübeck, Germany",
        phone: "+44 7934 980214",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965213/cbm/contact-offices/02-Europe-Germany/cbm/contact-offices/02-Europe-Germany/cbm-360-tiv---germany-gmbh---co--kg.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Europe",
        country: "France",
        office_name: "CBM 360 TIV - France SARL",
        address: "3 Rue de Budapest, 94140 Alfortville, France",
        phone: "+33 638532301",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965214/cbm/contact-offices/02-Europe-France/cbm/contact-offices/02-Europe-France/cbm-360-tiv---france-sarl.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Europe",
        country: "Portugal",
        office_name: "CBM 360 TIV - Portugal Lda",
        address: "R. Carmen Miranda 2, 2700-399 Amadora, Portugal",
        phone: "+351 935443514",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965215/cbm/contact-offices/02-Europe-Portugal/cbm/contact-offices/02-Europe-Portugal/cbm-360-tiv---portugal-lda.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Europe",
        country: "Spain",
        office_name: "CBM 360 TIV - Spain S. L",
        address: "C. de Sta. Saturnina, Carabanchel, 28019 Madrid, Spain",
        phone: "+34 616705239",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965216/cbm/contact-offices/02-Europe-Spain/cbm/contact-offices/02-Europe-Spain/cbm-360-tiv---spain-s--l.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Europe",
        country: "Russia",
        office_name: "CBM 360 TIV – Russia Ltd OOO",
        address: "Ulitsa Gasheka, д. 6, Moscow, Russia, 125047",
        phone: "+7 9199395280",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965218/cbm/contact-offices/02-Europe-Russia/cbm/contact-offices/02-Europe-Russia/cbm-360-tiv---russia-ltd-ooo.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Europe",
        country: "Ukraine",
        office_name: "CBM 360 TIV – Ukraine LLC/TOV",
        address: "Заводська вул, 1, Hlukhivtsi, Vinnytsia Oblast, Ukraine, 22130",
        phone: "+38 0616523760",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965219/cbm/contact-offices/02-Europe-Ukraine/cbm/contact-offices/02-Europe-Ukraine/cbm-360-tiv---ukraine-llc-tov.png",
        notes: "Laboratory Facility"
      }
    ]
  },
  {
    region_name: "Regional Head Office – Emirates (Dubai, UAE)",
    offices: [
      {
        region: "Middle East",
        country: "United Arab Emirates",
        office_name: "CBM 360 TIV Emirates - Dubai – UAE",
        address: "57C5+9HW - Al Quoz - Al Quoz 1 - Dubai - United Arab Emirates",
        phone: "+971 568171547",
        emails: ["Support@cbm360tiv.com", "info@cbm360tiv.com"],
        is_lab_facility: true,
        notes: "Laboratory Facility"
      }
    ]
  },
  {
    region_name: "Middle East and Africa",
    offices: [
      {
        region: "Africa",
        country: "South Africa",
        office_name: "CBM 360 TIV - South Africa Pty Ltd",
        address: "258 Roan Cres, Randjes park, Midrand, 1685, South Africa",
        phone: "+27 761108584",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965220/cbm/contact-offices/04-Middle-East-Africa-South-Africa/cbm/contact-offices/04-Middle-East-Africa-South-Africa/cbm-360-tiv---south-africa-pty-ltd.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Namibia",
        office_name: "CBM 360 TIV - Namibia Pty Ltd",
        address: "C3JM+8PJ, Western Byp, Windhoek, Namibia",
        phone: "+264 818756942",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965221/cbm/contact-offices/04-Middle-East-Africa-Namibia/cbm/contact-offices/04-Middle-East-Africa-Namibia/cbm-360-tiv---namibia-pty-ltd.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Botswana",
        office_name: "CBM 360 TIV - Botswana Pty Ltd",
        address: "Plot 20618, Block 3, Gaborone, Botswana",
        phone: "+267 3904040",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965222/cbm/contact-offices/04-Middle-East-Africa-Botswana/cbm/contact-offices/04-Middle-East-Africa-Botswana/cbm-360-tiv---botswana-pty-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Zimbabwe",
        office_name: "CBM 360 TIV - Zimbabwe LLC",
        address: "5 Garryowen Way, Bulawayo, Zimbabwe",
        phone: "+263 782711113",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965223/cbm/contact-offices/04-Middle-East-Africa-Zimbabwe/cbm/contact-offices/04-Middle-East-Africa-Zimbabwe/cbm-360-tiv---zimbabwe-llc.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Angola",
        office_name: "CBM 360 TIV - Angola SA",
        address: "47W9+7P9, R. F, Luanda, Angola",
        phone: "+244 975832013",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965225/cbm/contact-offices/04-Middle-East-Africa-Angola/cbm/contact-offices/04-Middle-East-Africa-Angola/cbm-360-tiv---angola-sa.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Democratic Republic of the Congo",
        office_name: "CBM 360 TIV - DR Congo SARL",
        address: "555 Zinnias, 10th Residential Street, Limete / Kinshasa, Democratic Republic of the Congo",
        phone: "+243 834150175",
        emails: ["info@cbm360tiv.com", "drc@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965226/cbm/contact-offices/04-Middle-East-Africa-DR-Congo/cbm/contact-offices/04-Middle-East-Africa-DR-Congo/cbm-360-tiv---dr-congo-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Madagascar",
        office_name: "CBM 360 TIV - Madagascar SARL",
        address: "Androndra, Antananarivo, 101, Madagascar",
        phone: "+261 340124609",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965227/cbm/contact-offices/04-Middle-East-Africa-Madagascar/cbm/contact-offices/04-Middle-East-Africa-Madagascar/cbm-360-tiv---madagascar-sarl.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Mozambique",
        office_name: "CBM 360 TIV - Mozambique SA",
        address: "V789+VWM, Nampula, Mozambique",
        phone: "+258 844191049",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965228/cbm/contact-offices/04-Middle-East-Africa-Mozambique/cbm/contact-offices/04-Middle-East-Africa-Mozambique/cbm-360-tiv---mozambique-sa.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Zambia",
        office_name: "CBM 360 TIV - Zambia PVT LTD",
        address: "8628 Njanshinshi Road, Lusaka 36094, Zambia",
        phone: "+260 974255926",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965229/cbm/contact-offices/04-Middle-East-Africa-Zambia/cbm/contact-offices/04-Middle-East-Africa-Zambia/cbm-360-tiv---zambia-pvt-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Malawi",
        office_name: "CBM 360 TIV - Malawi PVT LTD",
        address: "Area 3, Lilongwe, Malawi",
        phone: "+265 999862543",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965231/cbm/contact-offices/04-Middle-East-Africa-Malawi/cbm/contact-offices/04-Middle-East-Africa-Malawi/cbm-360-tiv---malawi-pvt-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Tanzania",
        office_name: "CBM 360 TIV - Tanzania LLC",
        address: "Msumbiji, Mwanza 33214, Tanzania",
        phone: "+255 757068735",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965232/cbm/contact-offices/04-Middle-East-Africa-Tanzania/cbm/contact-offices/04-Middle-East-Africa-Tanzania/cbm-360-tiv---tanzania-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Rwanda",
        office_name: "CBM 360 TIV - Rwanda LLC",
        address: "12 KN 31 St, Kigali, Rwanda",
        phone: "+250 781270076",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965233/cbm/contact-offices/04-Middle-East-Africa-Rwanda/cbm/contact-offices/04-Middle-East-Africa-Rwanda/cbm-360-tiv---rwanda-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Republic of the Congo",
        office_name: "CBM 360 TIV - Republic of Congo SARL",
        address: "06 Ter, Rue Mabiala, Brazzaville, Republic of the Congo",
        phone: "+242 068227798",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965234/cbm/contact-offices/04-Middle-East-Africa-Republic-of-Congo/cbm/contact-offices/04-Middle-East-Africa-Republic-of-Congo/cbm-360-tiv---republic-of-congo-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Gabon",
        office_name: "CBM 360 TIV - Gabon SARL",
        address: "9G72+3W5 B.P:15710, Libreville, Gabon",
        phone: "+241 66610191",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965235/cbm/contact-offices/04-Middle-East-Africa-Gabon/cbm/contact-offices/04-Middle-East-Africa-Gabon/cbm-360-tiv---gabon-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Uganda",
        office_name: "CBM 360 TIV - Uganda LTD",
        address: "8H48+PV4, Musajja Alumbwa Rd, Kampala, Uganda",
        phone: "+256 772402589",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965237/cbm/contact-offices/04-Middle-East-Africa-Uganda/cbm/contact-offices/04-Middle-East-Africa-Uganda/cbm-360-tiv---uganda-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Kenya",
        office_name: "CBM 360 TIV - Kenya LTD",
        address: "MP7W+9CH, Langata Rd, Nairobi, Kenya",
        phone: "+254 728961984",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965238/cbm/contact-offices/04-Middle-East-Africa-Kenya/cbm/contact-offices/04-Middle-East-Africa-Kenya/cbm-360-tiv---kenya-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Ethiopia",
        office_name: "CBM 360 TIV - Ethiopia PLC",
        address: "Bulgaria Gult, Addis Ababa, Ethiopia",
        phone: "+251 988983197",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965240/cbm/contact-offices/04-Middle-East-Africa-Ethiopia/cbm/contact-offices/04-Middle-East-Africa-Ethiopia/cbm-360-tiv---ethiopia-plc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Eritrea",
        office_name: "CBM 360 TIV - Eritrea LLC",
        address: "8W9J+P2Q, Gejeret, Asmara, Eritrea",
        phone: "+291 7628882",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965241/cbm/contact-offices/04-Middle-East-Africa-Eritrea/cbm/contact-offices/04-Middle-East-Africa-Eritrea/cbm-360-tiv---eritrea-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "South Sudan",
        office_name: "CBM 360 TIV - South Sudan LLC",
        address: "RHHF+6C7, Juba, South Sudan",
        phone: "+211 916755734",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965242/cbm/contact-offices/04-Middle-East-Africa-South-Sudan/cbm/contact-offices/04-Middle-East-Africa-South-Sudan/cbm-360-tiv---south-sudan-llc.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Chad",
        office_name: "CBM 360 TIV - Chad SARL",
        address: "436Q+H9C, 7EME Arrondissement, N'Djamena, Chad",
        phone: "+235 66970888",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965243/cbm/contact-offices/04-Middle-East-Africa-Chad/cbm/contact-offices/04-Middle-East-Africa-Chad/cbm-360-tiv---chad-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Cameroon",
        office_name: "CBM 360 TIV - Cameroon SARL",
        address: "253 Maison Blanche, Yaoundé, Cameroon",
        phone: "+237 242000182",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965244/cbm/contact-offices/04-Middle-East-Africa-Cameroon/cbm/contact-offices/04-Middle-East-Africa-Cameroon/cbm-360-tiv---cameroon-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Equatorial Guinea",
        office_name: "CBM 360 TIV - Equatorial Guinea SARL",
        address: "RQQC+W6J, Bata, Equatorial Guinea",
        phone: "+240 555766928",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965246/cbm/contact-offices/04-Middle-East-Africa-Equatorial-Guinea/cbm/contact-offices/04-Middle-East-Africa-Equatorial-Guinea/cbm-360-tiv---equatorial-guinea-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Nigeria",
        office_name: "CBM 360 TIV - Nigeria LLC",
        address: "Phase 2, Central Business District, Abuja 900103, Nigeria",
        phone: "+234 7032041760",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965247/cbm/contact-offices/04-Middle-East-Africa-Nigeria/cbm/contact-offices/04-Middle-East-Africa-Nigeria/cbm-360-tiv---nigeria-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Africa",
        country: "Niger",
        office_name: "CBM 360 TIV - Niger PVT",
        address: "G56C+HMQ, Niamey, Niger",
        phone: "+227 93858559",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965248/cbm/contact-offices/04-Middle-East-Africa-Niger/cbm/contact-offices/04-Middle-East-Africa-Niger/cbm-360-tiv---niger-pvt.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Ghana",
        office_name: "CBM 360 TIV - Ghana LTD",
        address: "2nd Floor Hiralco Building, 27 Kojo Thompson Rd, Accra, Ghana",
        phone: "+233 548636279",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965249/cbm/contact-offices/04-Middle-East-Africa-Ghana/cbm/contact-offices/04-Middle-East-Africa-Ghana/cbm-360-tiv---ghana-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Burkina Faso",
        office_name: "CBM 360 TIV - Burkina Faso SARL",
        address: "9F53+9Q, Goughin, Ouagadougou, Burkina Faso",
        phone: "+226 71006556",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965250/cbm/contact-offices/04-Middle-East-Africa-Burkina-Faso/cbm/contact-offices/04-Middle-East-Africa-Burkina-Faso/cbm-360-tiv---burkina-faso-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Benin",
        office_name: "CBM 360 TIV - Benin SARL LLC",
        address: "Qtier Agla, Ilot 3386 Mson Sohe, Cotonou, Benin",
        phone: "+229 96439628",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965251/cbm/contact-offices/04-Middle-East-Africa-Benin/cbm/contact-offices/04-Middle-East-Africa-Benin/cbm-360-tiv---benin-sarl-llc.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Togo",
        office_name: "CBM 360 TIV - Togo SARL",
        address: "55W7+69H, Unnamed Road, Lomé, Togo",
        phone: "+228 92329886",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965252/cbm/contact-offices/04-Middle-East-Africa-Togo/cbm/contact-offices/04-Middle-East-Africa-Togo/cbm-360-tiv---togo-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Côte d'Ivoire",
        office_name: "CBM 360 TIV - Côte d'Ivoire SARL",
        address: "92G2+H7Q, Abidjan, Côte d'Ivoire",
        phone: "+225 0788726800",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965254/cbm/contact-offices/04-Middle-East-Africa-Cote-dIvoire/cbm/contact-offices/04-Middle-East-Africa-Cote-dIvoire/cbm-360-tiv---c-te-d-ivoire-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Mali",
        office_name: "CBM 360 TIV - Mali SARL",
        address: "rue 224 porte 474, Bamako, Mali",
        phone: "+223 78436527",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965255/cbm/contact-offices/04-Middle-East-Africa-Mali/cbm/contact-offices/04-Middle-East-Africa-Mali/cbm-360-tiv---mali-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Sierra Leone",
        office_name: "CBM 360 TIV - Sierra Leone PVT LTD",
        address: "9 Tejan Street - Mission, Freetown, Sierra Leone",
        phone: "+232 72070450",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965256/cbm/contact-offices/04-Middle-East-Africa-Sierra-Leone/cbm/contact-offices/04-Middle-East-Africa-Sierra-Leone/cbm-360-tiv---sierra-leone-pvt-ltd.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Guinea",
        office_name: "CBM 360 TIV - Guinea SARL",
        address: "PGCM+C6V, Conakry, Guinea",
        phone: "+224 610196790",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965257/cbm/contact-offices/04-Middle-East-Africa-Guinea/cbm/contact-offices/04-Middle-East-Africa-Guinea/cbm-360-tiv---guinea-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Senegal",
        office_name: "CBM 360 TIV - Senegal SARL",
        address: "PJX8+WXJ, Dakar, Senegal",
        phone: "+221 767500648",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965258/cbm/contact-offices/04-Middle-East-Africa-Senegal/cbm/contact-offices/04-Middle-East-Africa-Senegal/cbm-360-tiv---senegal-sarl.png",
        notes: ""
      },
      {
        region: "Africa",
        country: "Mauritania",
        office_name: "CBM 360 TIV – Mauritania SARL",
        address: "329X+4PM, Nouakchott, Mauritania",
        phone: "+222 32395075",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965259/cbm/contact-offices/04-Middle-East-Africa-Mauritania/cbm/contact-offices/04-Middle-East-Africa-Mauritania/cbm-360-tiv---mauritania-sarl.png",
        notes: ""
      }
    ]
  },
  {
    region_name: "Regional Head Office – Hong Kong",
    offices: [
      {
        region: "Asia",
        country: "Hong Kong",
        office_name: "CBM 360 TIV - Hong Kong",
        address: "Universal Trade Centre, 22/F, Unit 2201-02, 3 Arbuthnot Road, Central, Mid-Levels, Hong Kong",
        phone: "+85 239028637",
        emails: ["Support@cbm360tiv.com", "info@cbm360tiv.com"],
        is_lab_facility: true,
        notes: "Laboratory Facility"
      }
    ]
  },
  {
    region_name: "Asia-Pacific",
    offices: [
      {
        region: "Asia-Pacific",
        country: "China",
        office_name: "CBM 360 TIV - China LLC",
        address: "33 Dongquan Rd, Xuhui District, Shanghai, China, 200234",
        phone: "+86 18355307541",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965261/cbm/contact-offices/06-Asia-Pacific-China/cbm/contact-offices/06-Asia-Pacific-China/cbm-360-tiv---china-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "Kazakhstan",
        office_name: "CBM 360 TIV - Kazakhstan LLP",
        address: "пос. Уркер, 020000, Astana, Kazakhstan",
        phone: "+7 7786270530",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965262/cbm/contact-offices/06-Asia-Pacific-Kazakhstan/cbm/contact-offices/06-Asia-Pacific-Kazakhstan/cbm-360-tiv---kazakhstan-llp.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "Mongolia",
        office_name: "CBM 360 TIV - Mongolia LLC",
        address: "CHD - 2 khoroo, Ulaanbaatar 15172, Mongolia",
        phone: "+976 88605268",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965263/cbm/contact-offices/06-Asia-Pacific-Mongolia/cbm/contact-offices/06-Asia-Pacific-Mongolia/cbm-360-tiv---mongolia-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "India",
        office_name: "CBM 360 TIV - India PVT LTD",
        address: "3rd Floor No, Bhartiya Bhavan, 219, P D'Mello Rd, Mazgaon, Mumbai, Maharashtra 400001, India",
        phone: "+91 9014904848",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965264/cbm/contact-offices/06-Asia-Pacific-India/cbm/contact-offices/06-Asia-Pacific-India/cbm-360-tiv---india-pvt-ltd.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "South Korea",
        office_name: "CBM 360 TIV - South Korea LLC",
        address: "1-1140 Yongsan-dong 2(i)-ga, Yongsan District, Seoul, South Korea",
        phone: "+82 25538974",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965265/cbm/contact-offices/06-Asia-Pacific-South-Korea/cbm/contact-offices/06-Asia-Pacific-South-Korea/cbm-360-tiv---south-korea-llc.png",
        notes: ""
      },
      {
        region: "Asia-Pacific",
        country: "Myanmar",
        office_name: "CBM 360 TIV - Myanmar PLC",
        address: "8FGC+54H, Bago, Myanmar (Burma)",
        phone: "+95 95090057",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965266/cbm/contact-offices/06-Asia-Pacific-Myanmar/cbm/contact-offices/06-Asia-Pacific-Myanmar/cbm-360-tiv---myanmar-plc.png",
        notes: ""
      },
      {
        region: "Asia-Pacific",
        country: "Malaysia",
        office_name: "CBM 360 TIV - Malaysia PLC",
        address: "Jalan Stonor, Kuala Lumpur, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        phone: "+60 327018553",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965267/cbm/contact-offices/06-Asia-Pacific-Malaysia/cbm/contact-offices/06-Asia-Pacific-Malaysia/cbm-360-tiv---malaysia-plc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "Thailand",
        office_name: "CBM 360 TIV - Thailand PLC",
        address: "PFXW+2RM, Wang Burapha Phirom, Phra Nakhon, Bangkok 10200, Thailand",
        phone: "+66 843586999",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965268/cbm/contact-offices/06-Asia-Pacific-Thailand/cbm/contact-offices/06-Asia-Pacific-Thailand/cbm-360-tiv---thailand-plc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "Indonesia",
        office_name: "CBM 360 TIV - Indonesia PT",
        address: "4, RT.4/RW.2, Selong, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110, Indonesia",
        phone: "+62 82312120662",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965269/cbm/contact-offices/06-Asia-Pacific-Indonesia/cbm/contact-offices/06-Asia-Pacific-Indonesia/cbm-360-tiv---indonesia-pt.png",
        notes: ""
      },
      {
        region: "Asia-Pacific",
        country: "Philippines",
        office_name: "CBM 360 TIV - Philippines LLC",
        address: "2001 Araneta, Sta. Mesa, Manila, 1008 Kalakhang Maynila, Philippines",
        phone: "+63 9605462016",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965270/cbm/contact-offices/06-Asia-Pacific-Philippines/cbm/contact-offices/06-Asia-Pacific-Philippines/cbm-360-tiv---philippines-llc.png",
        notes: ""
      },
      {
        region: "Asia-Pacific",
        country: "Australia",
        office_name: "CBM 360 TIV - Australia Pty LTD",
        address: "3/104 Dickenson St, Carina QLD 4152, Australia",
        phone: "+61 417794973",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965272/cbm/contact-offices/06-Asia-Pacific-Australia/cbm/contact-offices/06-Asia-Pacific-Australia/cbm-360-tiv---australia-pty-ltd.png",
        notes: "Laboratory Facility"
      },
      {
        region: "Asia-Pacific",
        country: "Papua New Guinea",
        office_name: "CBM 360 TIV - Papua New Guinea LLC",
        address: "UPNG Housing Estate, J11 Fortbanner, Port Moresby, National Capital District, Papua New Guinea",
        phone: "+67 582024467",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965273/cbm/contact-offices/06-Asia-Pacific-Papua-New-Guinea/cbm/contact-offices/06-Asia-Pacific-Papua-New-Guinea/cbm-360-tiv---papua-new-guinea-llc.png",
        notes: "Laboratory Facility"
      }
    ]
  },
  {
    region_name: "Regional Head Office – Brazil",
    offices: [
      {
        region: "South America",
        country: "Brazil",
        office_name: "CBM 360 TIV – Brazil Ltda",
        address: "R. Santo Estevão, 57 - Andaraí, Rio de Janeiro - RJ, 20541-240, Brazil",
        phone: "+55 21965549701",
        emails: ["Support@cbm360tiv.com", "info@cbm360tiv.com"],
        is_lab_facility: true,
        notes: "Laboratory Facility"
      }
    ]
  },
  {
    region_name: "North America and South America",
    offices: [
      {
        region: "North America",
        country: "United States",
        office_name: "CBM 360 TIV - USA LLC",
        address: "486 N Wakefield St, Arlington, VA 22203, USA",
        phone: "+1 2482385338",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965274/cbm/contact-offices/08-North-South-America-USA/cbm/contact-offices/08-North-South-America-USA/cbm-360-tiv---usa-llc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "North America",
        country: "Canada",
        office_name: "CBM 360 TIV – Canada Inc",
        address: "1055 Boulevard Cote Vertu Ouest, Saint-Laurent, Quebec H4L 5N1, Canada",
        phone: "+1 6043394106",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965275/cbm/contact-offices/08-North-South-America-Canada/cbm/contact-offices/08-North-South-America-Canada/cbm-360-tiv---canada-inc.png",
        notes: "Laboratory Facility"
      },
      {
        region: "North America",
        country: "Mexico",
        office_name: "CBM 360 TIV - México S. de R. L",
        address: "C. de la Palma 30, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX, México",
        phone: "+52 5591944396",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965276/cbm/contact-offices/08-North-South-America-Mexico/cbm/contact-offices/08-North-South-America-Mexico/cbm-360-tiv---m-xico-s--de-r--l.png",
        notes: "Laboratory Facility"
      },
      {
        region: "North America",
        country: "Dominican Republic",
        office_name: "CBM 360 TIV – Dominican Republic SRL",
        address: "Calle Maguey 12, Santo Domingo, Dominican Republic",
        phone: "+1 8494563437",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965277/cbm/contact-offices/08-North-South-America-Dominican-Republic/cbm/contact-offices/08-North-South-America-Dominican-Republic/cbm-360-tiv---dominican-republic-srl.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Venezuela",
        office_name: "CBM 360 TIV - Venezuela PLC (S.A.)",
        address: "C3XC+7FJ, C. El Manguito, Caracas 1090, Distrito Capital, Venezuela",
        phone: "+58 4121869823",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965278/cbm/contact-offices/08-North-South-America-Venezuela/cbm/contact-offices/08-North-South-America-Venezuela/cbm-360-tiv---venezuela-plc--s-a--.png",
        notes: ""
      },
      {
        region: "North America",
        country: "Trinidad & Tobago",
        office_name: "CBM 360 TIV – Trinidad & Tobago (Ltd.)",
        address: "MG32+VFG, Unnamed Road, Port of Spain, Trinidad & Tobago",
        phone: "+18687806684",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965279/cbm/contact-offices/08-North-South-America-Trinidad-and-Tobago/cbm/contact-offices/08-North-South-America-Trinidad-and-Tobago/cbm-360-tiv---trinidad---tobago--ltd--.png",
        notes: ""
      },
      {
        region: "South America",
        country: "French Guiana",
        office_name: "CBM 360 TIV - French Guiana SARL",
        address: "9 Imp. du Coeur Brun Noir, Cayenne 97300, French Guiana",
        phone: "+594 694231988",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965281/cbm/contact-offices/08-North-South-America-French-Guiana/cbm/contact-offices/08-North-South-America-French-Guiana/cbm-360-tiv---french-guiana-sarl.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Suriname",
        office_name: "CBM 360 TIV – Suriname NV",
        address: "RQ8X+9X3, Jaggernath Lachmon St, Paramaribo, Suriname",
        phone: "+597 7232858",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965282/cbm/contact-offices/08-North-South-America-Suriname/cbm/contact-offices/08-North-South-America-Suriname/cbm-360-tiv---suriname-nv.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Guyana",
        office_name: "CBM 360 TIV - Guyana (PLLC)",
        address: "1 Wren Ave, Georgetown, Guyana",
        phone: "+59 2 6826061",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965283/cbm/contact-offices/08-North-South-America-Guyana/cbm/contact-offices/08-North-South-America-Guyana/cbm-360-tiv---guyana--pllc-.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Colombia",
        office_name: "CBM 360 TIV – Colombia (SAS)",
        address: "Cl. 119a #56a-83, Bogotá, Colombia",
        phone: "+57 3208036963",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965284/cbm/contact-offices/08-North-South-America-Colombia/cbm/contact-offices/08-North-South-America-Colombia/cbm-360-tiv---colombia--sas-.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Peru",
        office_name: "CBM 360 TIV - Peru (S.R.L.)",
        address: "Jr. Chancay 782, Lima 15001, Peru",
        phone: "+51 930980689",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965285/cbm/contact-offices/08-North-South-America-Peru/cbm/contact-offices/08-North-South-America-Peru/cbm-360-tiv---peru--s-r-l--.png",
        notes: "Laboratory Facility"
      },
      {
        region: "South America",
        country: "Bolivia",
        office_name: "CBM 360 TIV – Bolivia (SRL)",
        address: "XP4R+XM6, Calle Sucre, Bolivia",
        phone: "+591 73427850",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965286/cbm/contact-offices/08-North-South-America-Bolivia/cbm/contact-offices/08-North-South-America-Bolivia/cbm-360-tiv---bolivia--srl-.png",
        notes: ""
      },
      {
        region: "South America",
        country: "Ecuador",
        office_name: "CBM 360 TIV - Ecuador (Cia. Ltda.)",
        address: "Av. Universitaria, Quito 593852, Ecuador",
        phone: "+593 995604347",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965288/cbm/contact-offices/08-North-South-America-Ecuador/cbm/contact-offices/08-North-South-America-Ecuador/cbm-360-tiv---ecuador--cia--ltda--.png",
        notes: "Laboratory Facility"
      },
      {
        region: "South America",
        country: "Chile",
        office_name: "CBM 360 TIV – Chile SRL",
        address: "8360083 Santiago, Santiago Metropolitan Region, Chile",
        phone: "+56 225544983",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965289/cbm/contact-offices/08-North-South-America-Chile/cbm/contact-offices/08-North-South-America-Chile/cbm-360-tiv---chile-srl.png",
        notes: "Laboratory Facility"
      },
      {
        region: "South America",
        country: "Argentina",
        office_name: "CBM 360 TIV - Argentina SA",
        address: "Manuel de Sarratea 3250, B1678DUR Caseros, Provincia de Buenos Aires, Argentina",
        phone: "+54 1147500740",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: true,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965290/cbm/contact-offices/08-North-South-America-Argentina/cbm/contact-offices/08-North-South-America-Argentina/cbm-360-tiv---argentina-sa.png",
        notes: "Laboratory Facility"
      },
      {
        region: "South America",
        country: "Paraguay",
        office_name: "CBM 360 TIV – Paraguay SRL",
        address: "Cruz del Defensor 1242, Asunción 001414, Paraguay",
        phone: "+595 984977966",
        emails: ["info@cbm360tiv.com"],
        is_lab_facility: false,
        image_url: "https://res.cloudinary.com/docyipoze/image/upload/v1756965291/cbm/contact-offices/08-North-South-America-Paraguay/cbm/contact-offices/08-North-South-America-Paraguay/cbm-360-tiv---paraguay-srl.png",
        notes: ""
      }
    ]
  }
];

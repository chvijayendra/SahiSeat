import streamlit as st
import pandas as pd
import glob
import os

st.set_page_config(
    page_title="SahiSeat - Professional JoSAA Predictor",
    page_icon="🎓",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# --- CSS Styling for Mobile Professional Look ---
st.markdown("""
<style>
    /* Global styles */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }

    /* Hide standard sidebar and header for app-like feel */
    header {visibility: hidden;}
    [data-testid="collapsedControl"] {display: none;}
    
    .block-container {
        padding-top: 1rem;
        padding-bottom: 0rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    div[data-testid="stVerticalBlock"] > div {
        gap: 0.3rem;
    }

    .stSelectbox label,
    .stNumberInput label {
        font-size: 0.85rem;
        margin-bottom: 0rem;
    }

    .stButton > button {
        height: 2.8rem;
        border-radius: 10px;
    }
    
    .main-title {
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        font-size: 2.2rem;
        margin-bottom: 5px;
    }
    
    .sub-title {
        text-align: center;
        color: #718096;
        font-size: 1rem;
        margin-bottom: 2rem;
    }
    
    /* Input Form Cards */
    .stSelectbox, .stNumberInput {
        margin-bottom: 0.35rem;
    }
    
    .stSelectbox div[data-baseweb="select"] > div {
        min-height: 42px;
    }

    .stNumberInput input {
        height: 42px;
    }
    
    /* Result Card Styling */
    .college-card {
        background-color: #ffffff;
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-left: 5px solid #667eea;
        color: #2d3748;
    }
    
    /* Dark Mode Overrides */
    @media (prefers-color-scheme: dark) {
        .college-card {
            background-color: #1a202c;
            color: #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
            border-left: 5px solid #7f9cf5;
        }

        .college-title {
            color: #edf2f7;
        }
    }
    
    .college-title {
        font-size: 1.15rem;
        font-weight: 700;
        margin-bottom: 8px;
    }
    
    .branch-name {
        font-size: 0.95rem;
        font-weight: 500;
        color: #7f9cf5;
        margin-bottom: 12px;
    }
    
    .stats-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #a0aec0;
        border-top: 1px solid #e2e8f0;
        padding-top: 10px;
    }
    
    .badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        background-color: #ebf4ff;
        color: #4c51bf;
        margin-right: 6px;
        margin-bottom: 6px;
    }

    @media (prefers-color-scheme: dark) {
        .stats-row {
            border-top: 1px solid #4a5568;
        }

        .badge {
            background-color: #2b6cb0;
            color: #ebf8ff;
        }
    }
</style>
""", unsafe_allow_html=True)

# --- TITLE ---
st.markdown("""
<h1 style='
text-align:center;
margin-bottom:0;
font-size:2.2rem;
line-height:1.1;
'>
SahiSeat
</h1>

<p style='
text-align:center;
margin-top:0;
margin-bottom:0.7rem;
font-size:0.95rem;
color:#94A3B8;
'>
Smart College Prediction for JEE Counselling
</p>
""", unsafe_allow_html=True)

# --- LOAD DATA ---
@st.cache_data
def load_josaa_data():

    # FIXED PATH
    files = glob.glob("data/*.csv")

    df_list = []

    for f in files:

        basename = os.path.basename(f)

        # expected format: josaa_2025_Round6.csv
        parts = basename.replace(".csv", "").split("_")

        if len(parts) >= 3:
            year = parts[1]
            round_name = parts[2].replace("Round", "")
        else:
            year = "Unknown"
            round_name = "Unknown"

        try:
            with open(f, "r", encoding="utf-8", errors="ignore") as file:
                lines = file.readlines()

            skip = 0

            for i, line in enumerate(lines):
                if line.startswith("Institute"):
                    skip = i
                    break

            df = pd.read_csv(
                f,
                skiprows=skip,
                on_bad_lines="skip"
            )

            df["Year"] = year
            df["Round"] = round_name

            df_list.append(df)

        except Exception as e:
            st.warning(f"Failed to load {basename}: {e}")

    if df_list:

        combined_df = pd.concat(
            df_list,
            ignore_index=True
        )

        # Convert ranks
        combined_df["Opening Rank"] = pd.to_numeric(
            combined_df["Opening Rank"]
            .astype(str)
            .str.replace("P", "", regex=False),
            errors="coerce"
        )

        combined_df["Closing Rank"] = pd.to_numeric(
            combined_df["Closing Rank"]
            .astype(str)
            .str.replace("P", "", regex=False),
            errors="coerce"
        )

        return combined_df

    return pd.DataFrame()

# --- LOAD DF ---
df = load_josaa_data()

# --- ERROR IF EMPTY ---
if df.empty:
    st.error("No JoSAA data files found. Make sure CSV files are inside the data folder.")
    st.stop()

# --- INPUTS ---
col1, col2 = st.columns(2)

with col1:

    exam_type = st.selectbox(
        "Exam Type",
        ["JEE Main", "JEE Advanced"]
    )

    year_selected = st.selectbox(
        "JoSAA Year",
        sorted(df["Year"].unique(), reverse=True)
    )

    rank = st.number_input(
        "Your Rank",
        min_value=1,
        max_value=2000000,
        value=10000,
        step=100
    )

with col2:

    available_rounds = sorted(
        df[df["Year"] == year_selected]["Round"].unique(),
        key=lambda x: int(x) if x.isdigit() else 99,
        reverse=True
    )

    round_selected = st.selectbox(
        "Round",
        available_rounds
    )

    category = st.selectbox(
        "Category",
        [
            "OPEN",
            "EWS",
            "OBC-NCL",
            "SC",
            "ST",
            "OPEN (PwD)",
            "EWS (PwD)",
            "OBC-NCL (PwD)",
            "SC (PwD)",
            "ST (PwD)"
        ]
    )

    gender = st.selectbox(
        "Gender",
        [
            "Gender-Neutral",
            "Female-only (including Supernumerary)"
        ]
    )

# --- STATES ---
states_list = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Other"
]

default_index = states_list.index("Telangana")

home_state = st.selectbox(
    "Home State (For NITs HS Quota)",
    states_list,
    index=default_index
)

# --- NIT MAP ---
def map_state_to_nit(state):

    mapping = {
        "Andhra Pradesh": "Andhra Pradesh",
        "Arunachal Pradesh": "Arunachal Pradesh",
        "Assam": "Silchar",
        "Bihar": "Patna",
        "Chhattisgarh": "Raipur",
        "Delhi": "Delhi",
        "Goa": "Goa",
        "Gujarat": "Surat",
        "Haryana": "Kurukshetra",
        "Himachal Pradesh": "Hamirpur",
        "Jammu and Kashmir": "Srinagar",
        "Jharkhand": "Jamshedpur",
        "Karnataka": "Surathkal",
        "Kerala": "Calicut",
        "Madhya Pradesh": "Bhopal",
        "Maharashtra": "Nagpur",
        "Manipur": "Manipur",
        "Meghalaya": "Meghalaya",
        "Mizoram": "Mizoram",
        "Nagaland": "Nagaland",
        "Odisha": "Rourkela",
        "Punjab": "Jalandhar",
        "Rajasthan": "Jaipur",
        "Sikkim": "Sikkim",
        "Tamil Nadu": "Tiruchirappalli",
        "Telangana": "Warangal",
        "Tripura": "Agartala",
        "Uttar Pradesh": "Allahabad",
        "Uttarakhand": "Uttarakhand",
        "West Bengal": "Durgapur"
    }

    return mapping.get(state, "")

# --- BUTTON ---
if st.button(
    "Predict Colleges",
    type="primary",
    use_container_width=True
):

    with st.spinner("Finding best colleges..."):

        filtered_df = df[
            (df["Year"] == year_selected) &
            (df["Round"] == str(round_selected))
        ].copy()

        # Category filter
        filtered_df = filtered_df[
            filtered_df["Seat Type"]
            .str.strip()
            .str.upper() == category.upper()
        ]

        # Gender filter
        if gender.startswith("Female"):

            filtered_df = filtered_df[
                filtered_df["Gender"]
                .str.contains(
                    "Female|Gender-Neutral",
                    case=False,
                    na=False
                )
            ]

        else:

            filtered_df = filtered_df[
                filtered_df["Gender"]
                .str.contains(
                    "Gender-Neutral",
                    case=False,
                    na=False
                )
            ]

        # Exam Type
        if exam_type == "JEE Advanced":

            filtered_df = filtered_df[
                filtered_df["Institute"]
                .str.contains(
                    "Indian Institute of Technology",
                    case=False,
                    na=False
                )
            ]

        else:

            filtered_df = filtered_df[
                ~filtered_df["Institute"]
                .str.contains(
                    "Indian Institute of Technology ",
                    case=False,
                    na=False
                )
            ]

        # Quota Logic
        state_keyword = map_state_to_nit(home_state)

        def is_valid_quota(row):

            inst = str(row["Institute"]).upper()
            quota = str(row["Quota"]).upper()

            if "NATIONAL INSTITUTE OF TECHNOLOGY" in inst:

                is_home_nit = False

                if state_keyword and state_keyword.upper() in inst:
                    is_home_nit = True

                if is_home_nit:
                    return quota in ["HS", "AI"]
                else:
                    return quota in ["OS", "AI"]

            else:

                if quota == "AI":
                    return True

                if quota == "HS" and state_keyword.upper() in inst:
                    return True

                if quota == "OS" and state_keyword.upper() not in inst:
                    return True

                return False

        filtered_df = filtered_df[
            filtered_df.apply(is_valid_quota, axis=1)
        ]

        # Rank Logic
        filtered_df = filtered_df.dropna(
            subset=["Closing Rank"]
        )

        filtered_df["Rank Diff"] = (
            filtered_df["Closing Rank"] - rank
        )

        filtered_df = filtered_df[
            filtered_df["Rank Diff"] >= -2000
        ]

        filtered_df["Abs Diff"] = abs(
            filtered_df["Rank Diff"]
        )

        filtered_df = filtered_df.sort_values(
            by="Abs Diff"
        ).head(45)

        # --- RESULTS ---
        if filtered_df.empty:

            st.warning(
                "No colleges found matching your criteria."
            )

        else:

            st.success(
                f"{len(filtered_df)} Predicted Matches"
            )

            st.caption(
                "Use these insights for smarter choice filling."
            )

            for _, row in filtered_df.iterrows():

                inst = row["Institute"]
                prog = row["Academic Program Name"]

                cr = int(row["Closing Rank"])

                orank = (
                    int(row["Opening Rank"])
                    if pd.notna(row["Opening Rank"])
                    else "N/A"
                )

                q = row["Quota"]

                status_color = (
                    "#38a169"
                    if cr >= rank
                    else "#e53e3e"
                )

                status_text = (
                    "Safe"
                    if cr >= rank + 1000
                    else "Moderate"
                    if cr >= rank
                    else "Ambitious"
                )

                card_html = f'''
                <div class="college-card">

                    <div class="college-title">
                        {inst}
                    </div>

                    <div class="branch-name">
                        {prog}
                    </div>

                    <div>
                        <span class="badge">
                            {row['Seat Type']}
                        </span>

                        <span class="badge">
                            {row['Gender']}
                        </span>

                        <span class="badge">
                            {q} Quota
                        </span>

                        <span class="badge"
                        style="
                        background-color:{status_color}20;
                        color:{status_color};
                        ">
                        {status_text}
                        </span>
                    </div>

                    <div class="stats-row">

                        <div>
                            <b>Opening Rank:</b> {orank}
                        </div>

                        <div>
                            <b>Closing Rank:</b> {cr}
                        </div>

                    </div>

                </div>
                '''

                st.markdown(
                    card_html,
                    unsafe_allow_html=True
                )

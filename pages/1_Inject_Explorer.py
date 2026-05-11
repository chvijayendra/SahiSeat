with open('sahiseat_app.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find index of "# Build UI Inputs"
idx = next(i for i, line in enumerate(lines) if line.startswith("# Build UI Inputs"))

new_lines = lines[:idx]
new_lines.append("tab1, tab2 = st.tabs(['Predictor', 'Cutoff Explorer'])\n\n")
new_lines.append("with tab1:\n")

for line in lines[idx:]:
    if line.strip() == "":
        new_lines.append("\n")
    else:
        new_lines.append("    " + line)

# Now append the new Explorer Logic
explorer_code = """
with tab2:
    st.markdown("<h3 style='text-align: center; margin-bottom: 1rem;'>Explore Previous Year Cutoffs</h3>", unsafe_allow_html=True)
    
    if not df.empty:
        institutes = sorted(df['Institute'].dropna().unique())
        explorer_inst = st.selectbox("Select College", institutes, key="exp_inst")
        
        # Filter branches based on selected institute
        inst_df = df[df['Institute'] == explorer_inst]
        branches = sorted(inst_df['Academic Program Name'].dropna().unique())
        
        col_exp1, col_exp2 = st.columns(2)
        with col_exp1:
            explorer_branch = st.selectbox("Select Branch", branches, key="exp_branch")
            explorer_cat = st.selectbox("Category", ["OPEN", "EWS", "OBC-NCL", "SC", "ST", "OPEN (PwD)", "EWS (PwD)", "OBC-NCL (PwD)", "SC (PwD)", "ST (PwD)"], key="exp_cat")
            explorer_quota = st.selectbox("Quota", ["AI", "HS", "OS", "GO", "JK", "LA"], key="exp_quota")
            
        with col_exp2:
            explorer_gender = st.selectbox("Gender", ["Gender-Neutral", "Female-only (including Supernumerary)"], key="exp_gender")
            
            years = ["All Years"] + sorted(df['Year'].dropna().unique().tolist(), reverse=True)
            explorer_year = st.selectbox("Year", years, key="exp_year")
            
        if st.button("Explore Cutoffs", type="primary", use_container_width=True, key="exp_btn"):
            with st.spinner("Fetching historical cutoffs..."):
                exp_df = df.copy()
                
                # Apply filters
                exp_df = exp_df[
                    (exp_df['Institute'] == explorer_inst) &
                    (exp_df['Academic Program Name'] == explorer_branch) &
                    (exp_df['Seat Type'].str.upper().str.strip() == explorer_cat.upper()) &
                    (exp_df['Quota'].str.upper().str.strip() == explorer_quota.upper())
                ]
                
                if explorer_gender.startswith("Female"):
                    exp_df = exp_df[exp_df['Gender'].str.contains("Female|Gender-Neutral", case=False, na=False)]
                else:
                    exp_df = exp_df[exp_df['Gender'].str.contains("Gender-Neutral", case=False, na=False)]
                
                if explorer_year != "All Years":
                    exp_df = exp_df[exp_df['Year'] == str(explorer_year)]
                    
                exp_df = exp_df.dropna(subset=['Closing Rank'])
                
                if exp_df.empty:
                    st.warning("No historical cutoff data found.")
                else:
                    # Sort desc by Year and Round
                    exp_df['Round_Num'] = pd.to_numeric(exp_df['Round'], errors='coerce').fillna(0)
                    exp_df = exp_df.sort_values(by=['Year', 'Round_Num'], ascending=[False, False])
                    
                    st.success(f"Found {len(exp_df)} records.")
                    
                    best_rank = int(exp_df['Closing Rank'].min())
                    worst_rank = int(exp_df['Closing Rank'].max())
                    avg_rank = int(exp_df['Closing Rank'].mean())
                    
                    m1, m2, m3 = st.columns(3)
                    m1.metric("Best", best_rank)
                    m2.metric("Average", avg_rank)
                    m3.metric("Worst", worst_rank)
                    
                    st.markdown("<hr>", unsafe_allow_html=True)
                    
                    for _, row in exp_df.iterrows():
                        y = row['Year']
                        r = row['Round']
                        orank = int(row['Opening Rank']) if pd.notna(row['Opening Rank']) else "N/A"
                        cr = int(row['Closing Rank'])
                        
                        card_html = f'''
                        <div class="college-card">
                            <div style="font-size: 0.85rem; color: #718096; margin-bottom: 4px; font-weight: 600;">{y} • Round {r}</div>
                            <div class="college-title">{row['Institute']}</div>
                            <div class="branch-name">{row['Academic Program Name']}</div>
                            <div>
                                <span class="badge">{row['Seat Type']}</span>
                                <span class="badge">{row['Gender']}</span>
                                <span class="badge">{row['Quota']} Quota</span>
                            </div>
                            <div class="stats-row">
                                <div><b>Opening Rank:</b> {orank}</div>
                                <div><b>Closing Rank:</b> {cr}</div>
                            </div>
                        </div>
                        '''
                        st.markdown(card_html, unsafe_allow_html=True)
"""
new_lines.append(explorer_code)

with open('sahiseat_app.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Modification complete.")

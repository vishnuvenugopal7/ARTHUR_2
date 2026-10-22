function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('ARTHUR - Audit & Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
}

function getChecklistItems() {
  const data = [
    { "id": 1, "category": "General Safety", "requirement": "Check and Validate that the CCTV is recording with accurate timestamps, and surveillance warning signage is visible in the FD, TRC, and Store.", "applicable": "Common", "reviewMethod": "System Check: Verify recording and timestamps. Visual Inspection: Check for warning signage.", "marks": 1.3 },
    { "id": 2, "category": "General Safety", "requirement": "Availability: Correct ratio (2 ABC & 1 CO2 per 500 sq. ft., +1 ABC per extra 500 sq. ft.) and D-type present in the TRC.", "applicable": "Common", "reviewMethod": "Visual Inspection: Physically count and verify extinguisher types and locations.", "marks": 1.3 },
    { "id": 3, "category": "General Safety", "requirement": "Placement: Unblocked, appropriately hung, or in marked designated locations.", "applicable": "Common", "reviewMethod": "Visual Inspection: Physically check accessibility and mounting.", "marks": 1.3 },
    { "id": 4, "category": "General Safety", "requirement": "Compliance: Quarterly inspections, annual refilling, and vendor training records are complete and up-to-date.", "applicable": "Common", "reviewMethod": "Document Review: Check physical tags, maintenance logs, and vendor certificates.", "marks": 1.3 },
    { "id": 5, "category": "General Safety", "requirement": "Training: Branch employees have attended nominated trainings such as Safety Induction and Road Safety.", "applicable": "Common", "reviewMethod": "Document Review: Check HR attendance records or Learning Management System (LMS) reports.", "marks": 1.3 },
    { "id": 6, "category": "General Safety", "requirement": "Check for any blind spots or areas not covered by surveillance cameras. If any are found, mark as NC.", "applicable": "Common", "reviewMethod": "System Check: Verify recording and timestamps. Visual Inspection: Check for Fully coverage.", "marks": 1.3 },
    { "id": 7, "category": "Front Desk Operations", "requirement": "Check and confirm Customer PII QR is available at the front desk. Scan the QR, complete the G-form, and verify whether the Data Backup email has been received.", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify QR presence. System Check: Scan QR and verify email receipt.", "marks": 0.4 },
    { "id": 8, "category": "Front Desk Operations", "requirement": "Check and confirm whether the CCO is manually entering the customer details for dead phone enquiries.", "applicable": "Common", "reviewMethod": "Observation: Watch CCO interactions. System Check: Verify entries in the system.", "marks": 0.4 },
    { "id": 9, "category": "Front Desk Operations", "requirement": "Check and confirm if the FDE is checking the condition of the device and the DOA period (30 Days). If it is DOA, check if the FDE is verifying the invoice.", "applicable": "Common", "reviewMethod": "Observation: Watch FDE process. Document Review: Verify invoice checking.", "marks": 0.4 },
    { "id": 10, "category": "Front Desk Operations", "requirement": "Check and confirm if a call log is created in F1 Smart for 100% of calls, and if the customer's problem is mentioned.", "applicable": "Common", "reviewMethod": "System Check: Review F1 Smart logs.", "marks": 0.4 },
    { "id": 11, "category": "Front Desk Operations", "requirement": "Check and confirm if the payment tracker is updated with all necessary details.", "applicable": "Common", "reviewMethod": "Document Review: Review tracker records.", "marks": 0.4 },
    { "id": 12, "category": "Front Desk Operations", "requirement": "Check whether the Customer Units are safely handled at the Front desk/store/SVC.", "applicable": "Common", "reviewMethod": "Observation: Monitor device handling practices.", "marks": 0.4 },
    { "id": 13, "category": "Front Desk Operations", "requirement": "Check and confirm if a 6-Side Image is captured and updated in F1 Smart using the Google devices provided by the brand. Ensure that each Google device is enrolled with personal Enrolment process shared by the IT team, if not mark NC.", "applicable": "Common", "reviewMethod": "System Check: Verify image uploads in F1 Smart.", "marks": 0.4 },
    { "id": 14, "category": "Front Desk Operations", "requirement": "CCO Empathy & Engagement: Validate that customer interactions include a proper meet & greet, genuine empathy, and prompt attention with zero unacknowledged wait time.", "applicable": "Common", "reviewMethod": "Observation: Monitor customer interactions and wait times.", "marks": 0.4 },
    { "id": 15, "category": "Front Desk Operations", "requirement": "Floor Rover Execution: Validate constant floor presence and proactive customer support, including immediate door greetings, process guidance, wait-time data backup reminders, and general query assistance.", "applicable": "GWICs", "reviewMethod": "Observation: Monitor Floor Rover activities.", "marks": 0.4 },
    { "id": 16, "category": "Front Desk Operations", "requirement": "Check and ensure that the 'Google Pixel Counter / Google Dedicated Desk' is labeled/posted on the dedicated desk. Additionally check and verify the Google dedicated CCOs are handling any non-google brand customers if there mark NC.", "applicable": "MBWICs", "reviewMethod": "Visual Inspection: Check for labels.", "marks": 0.4 },
    { "id": 17, "category": "Front Desk Operations", "requirement": "Ensure phone pouches are used for all device transfers between the Front Desk and the TRC. Verify that a sufficient stock of pouches is maintained at the Front Desk.", "applicable": "Common", "reviewMethod": "Observation: Watch device transfers. Visual Inspection: Check pouch inventory.", "marks": 0.4 },
    { "id": 18, "category": "Front Desk Operations", "requirement": "Fill out the G-form for FDE performance (includes a set of questions) and update the genuine ratings for the FDE.", "applicable": "GWICs", "reviewMethod": "Active Evaluation: Complete the G-form based on observed performance.", "marks": 0.4 },
    { "id": 19, "category": "Front Desk Operations", "requirement": "Notice Board Display: Check if the Escalation Matrix for the branch and brand is displayed.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check notice board.", "marks": 0.4 },
    { "id": 20, "category": "Front Desk Operations", "requirement": "Notice Board Display: Check whether the following sheets are available in the notice board and sitting area: 1. Data backup 2. How to take your token 3. Customer WIFI (ID name and Password). 4. Do not require CX password poster.", "applicable": "Common / GWIC", "reviewMethod": "Visual Inspection: Check notice board and seating area.", "marks": 0.4 },
    { "id": 21, "category": "Front Desk Operations", "requirement": "Notice Board Display: Verify display and validity of 1. S&E Certificate, 2. GST certificate, 3. Trade License, 4. CLRA, 5. Emergency contact number, 6. ISMS Policy, 7. 365-day license.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check display. Document Review: Verify expiry dates.", "marks": 0.4 },
    { "id": 22, "category": "Front Desk Operations", "requirement": "Verify whether the S&E Certificate indicates the correct manpower (male and female count only for FTEs) for the West Zone (if applicable for other Zones).", "applicable": "Common", "reviewMethod": "Document Review: Read certificate details.", "marks": 0.4 },
    { "id": 23, "category": "Front Desk Operations", "requirement": "Back-End Display: Health and Safety Policy, Values, Anti-Corruption Policy, POSH Policy, and Absolute Safety Rules (Road Safety).", "applicable": "Common", "reviewMethod": "Visual Inspection: Check back-end area displays.", "marks": 0.4 },
    { "id": 24, "category": "Front Desk Operations", "requirement": "Check and verify that the Customer Experience Video is running on the TV without any delay and scan the QR provided in the video to check if the correct/updated one is being used.", "applicable": "GWICs", "reviewMethod": "Visual Inspection: Verify video playback. System Check: Scan QR code on screen.", "marks": 0.4 },
    { "id": 25, "category": "Infrastructure", "requirement": "Signage: Ensure all signage boards are free of physical damage and display the GSTIN number in both the local and English languages, along with the updated branch address.", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify signage condition and required details.", "marks": 0.4 },
    { "id": 26, "category": "Infrastructure", "requirement": "Branch Timings & Attendance: Verify official branch timings and confirm the SVC opens on time. Ensure all employees arrive at least 15 minutes before official operation time.", "applicable": "Common", "reviewMethod": "Observation: Monitor opening times. Document Review: Check employee attendance logs.", "marks": 0.4 },
    { "id": 27, "category": "Infrastructure", "requirement": "Area Identification: Clearly identify and label areas, such as the customer reception area, Store area, and repair area.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check for clear, visible labeling.", "marks": 0.4 },
    { "id": 28, "category": "Infrastructure", "requirement": "Electrical Safety (RCCB/Earth Pit): Ensure a 30mA RCCB is installed and the earth pit is properly maintained, with a valid resistance testing report available. Check and confirm the ESD grounding has been done completely, and check the value using the multimeter method.", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify RCCB presence. Document Review: Check resistance testing report.", "marks": 0.4 },
    { "id": 29, "category": "Infrastructure", "requirement": "Backup & Condition Check: Verify the availability and working condition of power/electricity and internet backup. Check the condition of the AC and furniture, ensuring items are damage-free.", "applicable": "Common", "reviewMethod": "System Check: Test power and internet backups. Visual Inspection: Assess AC and furniture.", "marks": 0.4 },
    { "id": 30, "category": "Infrastructure", "requirement": "Token System: Check the availability and working condition of the token machine and its monitor. Verify that the token number prompting machine is working properly.", "applicable": "GWICs", "reviewMethod": "System Check: Test token machine and prompting system.", "marks": 0.4 },
    { "id": 31, "category": "Infrastructure", "requirement": "First Aid: Ensure the first aid box is fully stocked with all necessary medicines and verify medicine expiry dates. Check and confirm oral medications are excluded from standard first aid kit requirements.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check kit contents. Document Review: Verify expiry dates.", "marks": 0.4 },
    { "id": 32, "category": "Infrastructure", "requirement": "Maintenance (5S & Aesthetics): Confirm that 5S (Sort, Set in order, Shine, Standardize, Sustain) is maintained in the reception, store, and repair areas. Check for any signs of paint peeling off walls in the SVC.", "applicable": "Common", "reviewMethod": "Visual Inspection: Assess general cleanliness, organization, and wall condition.", "marks": 0.4 },
    { "id": 33, "category": "Infrastructure", "requirement": "Electrical Hazard Check: Confirm the site is free from loose extension boards, temporary electrical connections, and damaged power sockets.", "applicable": "Common", "reviewMethod": "Visual Inspection: Walk through site to identify electrical hazards.", "marks": 0.4 },
    { "id": 34, "category": "Infrastructure", "requirement": "Panel Labeling: Confirm that the electrical panel is correctly labeled and identified on a single-line diagram.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check panel labels. Document Review: Verify single-line diagram.", "marks": 0.4 },
    { "id": 35, "category": "Infrastructure", "requirement": "Electrical Panel Safety: Check and confirm that dummy switches have been installed to cover any gaps in the electrical panels.", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect panels for exposed gaps.", "marks": 0.4 },
    { "id": 36, "category": "Infrastructure", "requirement": "Battery Safety: Verify that battery terminals are covered with appropriate terminal covers. (Compliance is also met if the battery is enclosed in a box or covered within a grilled area.)", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect inverter/backup batteries.", "marks": 0.4 },
    { "id": 37, "category": "Infrastructure", "requirement": "Water Dispenser: Ensure trays are installed beneath water dispensers in branch SVCs. Validate working condition, cleanliness, availability of paper glasses, and a cover on top of the bottle/can.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check cleanliness and supplies. System Check: Verify dispensing function.", "marks": 0.4 },
    { "id": 38, "category": "Infrastructure", "requirement": "Customer Wi-Fi: Check and ensure the Customer Wi-Fi facility has been implemented and is working properly. Additionally check the availability of QR code or Wifi ID and Password posters pasted in the SVC.", "applicable": "GWICs", "reviewMethod": "System Check: Connect to and test customer Wi-Fi.", "marks": 0.4 },
    { "id": 39, "category": "Infrastructure", "requirement": "Charging Stations: Check and ensure that charging stations/electricity plugs are available across the centers and are working properly.", "applicable": "GWICs", "reviewMethod": "Visual Inspection: Locate charging stations. System Check: Test for active power.", "marks": 0.4 },
    { "id": 40, "category": "Infrastructure", "requirement": "Reading Materials: Ensure bookshelves are properly arranged, visible, and reachable. Confirm they are damage-free and stocked with a minimum of three or more books and newspapers.", "applicable": "GWICs", "reviewMethod": "Visual Inspection: Check bookshelf condition, placement, and stock.", "marks": 0.4 },
    { "id": 41, "category": "Infrastructure", "requirement": "Cleanliness & Housekeeping: Check and ensure that cleaning is being performed in SVCs on a daily basis (twice a day if applicable). Additionally this has to be completed before 15 minutes of Branch opens.", "applicable": "Common", "reviewMethod": "Visual Inspection: Assess facility cleanliness. Document Review: Check housekeeping logs.", "marks": 0.4 },
    { "id": 42, "category": "Infrastructure", "requirement": "Washroom Facilities: Check and ensure that all washroom facilities are clean. (If not clean, mark as NC.)", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect washroom cleanliness and hygiene.", "marks": 0.4 },
    { "id": 43, "category": "Infrastructure", "requirement": "Waste Management: Check whether proper bins are provided. There should be separate bins for Dry/Wet waste and E-waste for electronics disposal, and all bins should be clearly identified.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check for appropriately labeled, segregated waste bins.", "marks": 0.4 },
    { "id": 44, "category": "IT Resource", "requirement": "Check whether genuine licensing software is being used or not.", "applicable": "Common", "reviewMethod": "System Check: Verify software properties and activation status. Document Review: Check license agreements/invoices.", "marks": 1.3 },
    { "id": 45, "category": "IT Resource", "requirement": "Check and confirm the USB portal access for desktop or laptop of the repair engineer, if available or not and using or not.", "applicable": "Common", "reviewMethod": "System Check: Inspect laptops for USB Portal access.", "marks": 1.3 },
    { "id": 46, "category": "IT Resource", "requirement": "Ensure that IT asset identification has been completed.", "applicable": "Common", "reviewMethod": "Visual Inspection: Look for physical asset tags or stickers. Document Review: Cross-verify with the IT asset register.", "marks": 1.3 },
    { "id": 47, "category": "IT Resource", "requirement": "Check for software licenses and their expiry dates.", "applicable": "Common", "reviewMethod": "Document Review: Verify license expiry dates in the IT portal or record repository.", "marks": 1.3 },
    { "id": 48, "category": "IT Resource", "requirement": "Check and confirm if the Google-provided devices (Google Pixel Phones) are available at the locations. (2 Mobile devices for GWIC—one for BM and one for ST usage—and 1 device for the MBWIC location.)", "applicable": "Common", "reviewMethod": "Visual Inspection: Physically verify the presence, condition, and allocation of the devices.", "marks": 1.3 },
    { "id": 49, "category": "IT Resource", "requirement": "Check and confirm if any personal devices (personal laptops) are being used for office login and continuing work.", "applicable": "Common", "reviewMethod": "Observation: Visually monitor the workspace for unauthorized personal devices. System Check: Review network logs.", "marks": 1.3 },
    { "id": 50, "category": "Store Operation", "requirement": "Ensure the system stock accurately matches the physical stock and verify if any excess/short inventory is present at the Service Center (SVC). Collect key part data from the Store person for validation and cross-check.", "applicable": "Common", "reviewMethod": "System Check & Visual Inspection: Compare physical counts against system inventory reports.", "marks": 0.4 },
    { "id": 51, "category": "Store Operation", "requirement": "Material Identification: Verify the clear identification and labeling of incoming materials and outgoing materials.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check material bins and boxes for clear labeling.", "marks": 0.4 },
    { "id": 52, "category": "Store Operation", "requirement": "Color Code System: Check if the Store displays a Color Code Chart and confirm that the system is being followed correctly.", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify chart display and cross-match with actual material tagging.", "marks": 0.4 },
    { "id": 53, "category": "Store Operation", "requirement": "Defective Material Handling: Check if defective materials are handled properly and dispatched to the Warehouse on time by validating the docket dates. a. In-Warranty (IW) spare parts must be dispatched to the Noida warehouse once every 3 days. b. Out-of-Warranty (OOW) parts must be dispatched to NRF 5 days a week.", "applicable": "Common", "reviewMethod": "Observation & Document Review: Monitor handling process and check dispatch logs.", "marks": 0.4 },
    { "id": 54, "category": "Store Operation", "requirement": "Stacking and Binning: Check the stacking and binning system and verify the stacking level.", "applicable": "Common", "reviewMethod": "Visual Inspection: Assess physical organization and stacking limits.", "marks": 0.4 },
    { "id": 55, "category": "Store Operation", "requirement": "Walkway Clearance: Ensure materials are stored in appropriate locations and do not block walkways.", "applicable": "Common", "reviewMethod": "Visual Inspection: Walk the floor to ensure clear paths.", "marks": 0.4 },
    { "id": 56, "category": "Store Operation", "requirement": "Storage Rack Condition: Verify that storage racks are interconnected (if applicable) and are free from defects.", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect structural integrity of racks.", "marks": 0.4 },
    { "id": 57, "category": "Store Operation", "requirement": "Material Placement: Ensure no materials are stored at the top of the racks. Confirm that heavy materials are stored at floor level and are placed on wooden/plastic pallets.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check top racks and floor storage methods.", "marks": 0.4 },
    { "id": 58, "category": "Store Operation", "requirement": "Package Unboxing: Check if Safety Cutters are exclusively used for unboxing packages.", "applicable": "Common", "reviewMethod": "Observation: Watch the unboxing process and inspect tools being used.", "marks": 0.4 },
    { "id": 59, "category": "Store Operation", "requirement": "Check the condition of the camera in the packing area to ensure it is functioning and properly recording sessions.", "applicable": "Common", "reviewMethod": "Observation & System Check: Watch unpacking process and ensure it falls within CCTV FOV.", "marks": 0.4 },
    { "id": 60, "category": "Store Operation", "requirement": "Please check and confirm that the SCM person inspects the physical condition of all inbound parts immediately upon unpacking under CCTV surveillance.", "applicable": "Common", "reviewMethod": "System Check: Verify live feed and playback from the packing area camera.", "marks": 0.4 },
    { "id": 61, "category": "Store Operation", "requirement": "Please check and confirm whether any DOA or damaged parts were identified during the unpacking or repair process. If so, verify that proper documentation has been completed and the item is updated as a DOA part in F1 Smart.", "applicable": "Common", "reviewMethod": "Document Review & System Check: Cross-reference F1 Smart records, documentation, and CCTV timestamps.", "marks": 0.4 },
    { "id": 62, "category": "Store Operation", "requirement": "ESD Safety: Check if store personnel are wearing ESD gloves while handling PCB and other ESD-sensitive parts.", "applicable": "Common", "reviewMethod": "Observation: Monitor personnel handling sensitive electronic components.", "marks": 0.4 },
    { "id": 63, "category": "Store Operation", "requirement": "Goods Received Note (GRN): Check and confirm the timestamp validation of the GRN.", "applicable": "Common", "reviewMethod": "System Check: Review GRN timestamps in the inventory system.", "marks": 0.4 },
    { "id": 64, "category": "Store Operation", "requirement": "Area Cleanliness: Check and confirm the cleanliness of the entire store area.", "applicable": "Common", "reviewMethod": "Visual Inspection: Evaluate general housekeeping in the store.", "marks": 0.4 },
    { "id": 65, "category": "Store Operation", "requirement": "Environmental Control: Check and confirm humidity and temperature levels within the store.", "applicable": "Common / GWIC", "reviewMethod": "Visual Inspection / System Check: Read thermohygrometer displays in the storage area.", "marks": 0.4 },
    { "id": 66, "category": "Store Operation", "requirement": "Access Control: Check and confirm that only authorized personnel have access to the store.", "applicable": "Common", "reviewMethod": "Observation & Visual Inspection: Ensure doors are locked/restricted and check who enters.", "marks": 0.4 },
    { "id": 67, "category": "Store Operation", "requirement": "Dedicated Google Storage: Verify that Google Products, Google Parts, and Google materials are physically stored in a dedicated area (e.g., labeled bins, shelves, or a separate locked cabinet) that is distinct from all other brands' items.", "applicable": "MBWICs", "reviewMethod": "Visual Inspection: Inspect storage segregation for Google-specific inventory.", "marks": 0.4 },
    { "id": 68, "category": "Store Operation", "requirement": "Please check and confirm whether the SCM personnel have completed and documented the Monthly PST audit for the branch.", "applicable": "GWICs", "reviewMethod": "Document Review: Ask for and review the completed Monthly PST audit document.", "marks": 0.4 },
    { "id": 69, "category": "Tools and Accessories", "requirement": "Verify the calibration records of measuring instruments (Multimeter, (Inhouse) ESD Wristband tester machine(NABL lab), Heater plate(Inhouse) etc.).", "applicable": "Common", "reviewMethod": "Document Review: Verify calibration certificates or calibration stickers on the instruments.", "marks": 3.8 },
    { "id": 70, "category": "Tools and Accessories", "requirement": "Check and confirm the correct and google approved toolkits are using during the repair process, the toolkit data is added below for your information Google - Tools ,Jigs & Fixtures 2026", "applicable": "Common", "reviewMethod": "Visual inspection with verifying each tools", "marks": 3.8 },
    { "id": 71, "category": "Repair Process", "requirement": "1. Check and confirm the engineer who repaired the device is the same engineer assigned to it in the system.", "applicable": "Common", "reviewMethod": "Pick a random repaired device and note its Serial Number. Look up the device in the system to see Assigned Engineer.", "marks": 0.4 },
    { "id": 72, "category": "Repair Process", "requirement": "Check and confirm the availability of SURA tool in ST assigned system, additionally check the ST is aware about this process and ask ST to flash any device with Sura tool to ensure the USB is not blocked.", "applicable": "Common", "reviewMethod": "Visual inspection during the repair process", "marks": 0.4 },
    { "id": 73, "category": "Repair Process", "requirement": "1. Verify that the Repair Engineer updates the warranty status in the F1 Smart system based on the inspection and validation findings. 2. Confirm that the Service Technician (ST) inspects the device for physical damage and identifies any damage not recorded.", "applicable": "Common", "reviewMethod": "System Check: Validate warranty status updates in F1 Smart.", "marks": 0.4 },
    { "id": 74, "category": "Repair Process", "requirement": "Confirm that the Service Technician (ST) conducts a comprehensive diagnosis and requests the necessary spare parts through F1 Smart before beginning the repair process.", "applicable": "Common", "reviewMethod": "System Check: Validate warranty status updates in F1 Smart.", "marks": 0.4 },
    { "id": 75, "category": "Repair Process", "requirement": "Confirm that the ST executes diagnostic triage pre-repair and post-repair (OQC). Sample at least 10 FSR cases/log notes in F1 Smart using the tracker to verify that the T-code matches the reported issue.", "applicable": "Common", "reviewMethod": "System Check: Review diagnostic logs and T-code accuracy on 10 random samples.", "marks": 0.4 },
    { "id": 76, "category": "Repair Process", "requirement": "Check if the Chamber is clean (Grimlock). (Except GWIC HYD)", "applicable": "GWICs", "reviewMethod": "Visual Inspection: Inspect chamber cleanliness.", "marks": 0.4 },
    { "id": 77, "category": "Repair Process", "requirement": "Check if a Timer is available with the Heat Separator machine, and if SIM cards are available (Optional).", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify tool availability at the station.", "marks": 0.4 },
    { "id": 78, "category": "Repair Process", "requirement": "Check if an ionizer fan is used during repair, along with transparent film to prevent dents and scratches. During and after repair process, this has to be followed.", "applicable": "Common", "reviewMethod": "Observation: Watch the ST during active repair to confirm usage.", "marks": 0.4 },
    { "id": 79, "category": "Repair Process", "requirement": "Check and Verify the ST is adherence to the ESD SOP: 1. ESD Apron Usage 2. ESD Wristband has been using and connected with table portal 3. ESD footwear availability 4. ESD checklist updation 5. ESD Wristband Testing on Daily basis", "applicable": "Common", "reviewMethod": "Visual inspection of equipment and process logs.", "marks": 0.4 },
    { "id": 80, "category": "Repair Process", "requirement": "Ensure the model-wise jig is used during repair activities.", "applicable": "Common", "reviewMethod": "Observation: Verify correct jig usage for the specific device model.", "marks": 0.4 },
    { "id": 81, "category": "Repair Process", "requirement": "Check if the heating temperature is set as per the model-wise sheet, and if a camera cap is used during repair.", "applicable": "Common", "reviewMethod": "Observation / Visual Inspection: Check temperature gauge and camera cap application.", "marks": 0.4 },
    { "id": 82, "category": "Repair Process", "requirement": "Check and ensure the heater plate is not positioned directly under an AC vent; it must be placed away from direct airflow. Verify temperature Calibration with IR thermometer.", "applicable": "Common", "reviewMethod": "Testing Procedure: Turn on the machine and set target temperature. Measure plate using the IR thermometer.", "marks": 0.4 },
    { "id": 83, "category": "Repair Process", "requirement": "Check whether the ST has access to the 'Tech Repository' link, and verify that the required resources (Service Manual, Assembly/Disassembly Video, and BOM File) are available and actively referenced.", "applicable": "Common", "reviewMethod": "Observation: Monitor if the engineer references the official manual.", "marks": 0.4 },
    { "id": 84, "category": "Repair Process", "requirement": "Check if appropriate, Google-approved tools are being used during the repair.", "applicable": "Common", "reviewMethod": "Visual Inspection / Observation: Inspect toolsets on the desk.", "marks": 0.4 },
    { "id": 85, "category": "Repair Process", "requirement": "Verify that the serial numbers for all replaced parts, as well as the IMEI number, are correctly updated in F1 Smart, and confirm that the call is closed only after proper entry.", "applicable": "Common", "reviewMethod": "System Check: Audit closed tickets in F1 Smart for correct part serials and IMEI.", "marks": 0.4 },
    { "id": 86, "category": "Repair Process", "requirement": "Check whether the ST is performing Visual Mechanical Inspection (VMI) as per process guidelines and checking for defects.", "applicable": "Common", "reviewMethod": "Observation: Watch the VMI process flow.", "marks": 0.4 },
    { "id": 87, "category": "Repair Process", "requirement": "Check if the correct part is consumed according to the reported fault/symptoms.", "applicable": "Common", "reviewMethod": "System Check: Match symptoms to the parts listed on the BOM/consumption report.", "marks": 0.4 },
    { "id": 88, "category": "Repair Process", "requirement": "Verify that the ST has selected the correct category for IW and OOW cases. Confirm the legitimacy of IW claims by auditing a random sample of 10 cases.", "applicable": "Common", "reviewMethod": "System Check: Audit 10 random IW cases against warranty terms and purchase dates.", "marks": 0.4 },
    { "id": 89, "category": "Repair Process", "requirement": "Check and confirm that the ST is maintaining proper 5S standards around the entire repair area.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check for cleanliness, organization, and standardization at the desk.", "marks": 0.4 },
    { "id": 90, "category": "Repair Process", "requirement": "Confirm that no materials or spare parts unrelated to the current job sheet are available at the repair area. (If any are found, mark as NC).", "applicable": "Common", "reviewMethod": "Visual Inspection / Observation: Inspect workbenches for part mixing or clutter.", "marks": 0.4 },
    { "id": 91, "category": "Repair Process", "requirement": "Check and confirm that after completing the repair, the ST performs a full final inspection according to brand guidelines.", "applicable": "Common", "reviewMethod": "Observation: Watch post-repair testing and QA steps.", "marks": 0.4 },
    { "id": 92, "category": "Repair Process", "requirement": "Check if all units are stored in polybags, are identified as per category, and confirm that job sheets are tagged to all units.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check physical device storage and tagging.", "marks": 0.4 },
    { "id": 93, "category": "Repair Process", "requirement": "Check whether technicians are denying software updates for customers due to inactive portal access. If purposefully denied, mark as NC.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check physical USB access and software status.", "marks": 0.4 },
    { "id": 94, "category": "Repair Process", "requirement": "Check for extra and left out screws & Unattended defect or good spares after the repair process.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check the availability of materials.", "marks": 0.4 },
    { "id": 95, "category": "Repair Process", "requirement": "Check and confirm the Repair desk Notice board includes the following mandatory documents: 1. Triage code and desc 2. Heater plate model wise temp and time 3. Back cover fixture press time 4. Latest ECN.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check physical verification of each sheet.", "marks": 0.4 },
    { "id": 96, "category": "Grooming", "requirement": "Check for employee grooming (T-shirts/shirts and ID cards), and ensure professional behavior and appropriate appearance of all employees. This is applicable for all employees including bikers.", "applicable": "Common", "reviewMethod": "Visual Inspection & Observation: Assess employee attire, hygiene, and overall professional conduct on the floor.", "marks": 1.9 },
    { "id": 97, "category": "Grooming", "requirement": "Check and confirm that all Customer Care Officers (CCOs) and Branch Managers (BMs) and Repair Engineers are wearing the correct name badges during operational hours.", "applicable": "GWICs, MBWICs", "reviewMethod": "Visual Inspection: Check for visible and accurate name badges on staff.", "marks": 1.9 },
    { "id": 98, "category": "Grooming", "requirement": "Check and confirm that name badges have been issued to newly joined CCOs and STs. Trainee badges must be issued within 2 days, and a 15-day TAT is given for permanent name badges.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check for visible and accurate name badges on staff.", "marks": 1.9 },
    { "id": 99, "category": "Grooming", "requirement": "Check and confirm if 'Trainee' badges are being issued to new joiners. Additionally, verify that each branch maintains a minimum stock of two trainee badges for active use.", "applicable": "Common", "reviewMethod": "Visual Inspection / Observation: Look for trainee badges on new staff and check the physical stock of spare badges.", "marks": 1.9 },
    { "id": 100, "category": "Customer Experience", "requirement": "1. Check whether handsets shown as 'delivered' in the system are physically available at the service center or vice versa (System v/s physical customer inventory should match).", "applicable": "Common", "reviewMethod": "System Check & Visual Inspection: Compare physical customer units on-hand against the system inventory reports.", "marks": 1.3 },
    { "id": 101, "category": "Customer Experience", "requirement": "Data Privacy: Ensure personal data of customers (IMEI, pictures, etc.) is not taken as a backup or shared. Check if customer data is completely erased or put in the repair mode from all devices post-repair/before testing.", "applicable": "Common", "reviewMethod": "System Check & Observation: Audit repaired devices for residual customer data and monitor data handling practices.", "marks": 1.3 },
    { "id": 102, "category": "Customer Experience", "requirement": "Check whether the SVC has provided Out-of-Warranty (OOW) quotations as per the latest price list. Ensure a proper invoice is issued to the customer in OOW cases and verify that no excess amount is charged.", "applicable": "Common", "reviewMethod": "Document Review & System Check: Cross-check a sample of OOW invoices against standard price lists and payment receipts.", "marks": 1.3 },
    { "id": 103, "category": "Customer Experience", "requirement": "Check whether the branch has sold spare parts to a third party without registering the call. Check whether the branch has used non-genuine parts to carry out repair activities.", "applicable": "Common", "reviewMethod": "Document Review & Visual Inspection: Audit inventory logs, billing records, and inspect parts used in repairs.", "marks": 1.3 },
    { "id": 104, "category": "Customer Experience", "requirement": "Check whether the branch has created a job in the 'In-Warranty (IW) category' but still collected money from customers. Check if OOW calls are being logged in the system as 'IW', and confirm that Customer Details and Invoice Year are verified.", "applicable": "Common", "reviewMethod": "System Check & Document Review: Audit a sample of IW cases against customer invoices, purchase dates, and billing records.", "marks": 1.3 },
    { "id": 105, "category": "Customer Experience", "requirement": "Check whether the SVC has any unattended customer units (devices whose details do not exist in the brand CRM).", "applicable": "Common", "reviewMethod": "Visual Inspection & System Check: Walk through the facility checking for loose or untagged devices and search for their IMEI/Serial.", "marks": 1.3 },
    { "id": 106, "category": "Job Sheets", "requirement": "Ensure job sheets are filled properly along with: a. including customer signature upon receiving the product, b. engineer signature, c. customer feedback, d. repair details, e. handwriting clarity, and date. f. Verify print and paper quality g. the amount added in the job sheet is correct. h. Damage marking", "applicable": "Common", "reviewMethod": "Document Review: Audit a sample of physical or digital job sheets for completeness, required signatures, document condition, and billing accuracy.", "marks": 3.8 },
    { "id": 107, "category": "Technical Training", "requirement": "Check and confirm the mandatory Technical training, Refresher training, New product training has been completed by FDE and Repair engineers.", "applicable": "Common", "reviewMethod": "Verify internal training logs and dashboards.", "marks": 7.7 },
    { "id": 108, "category": "Brand Login Credential", "requirement": "Check employee login credentials for F1-Smart and verify if IDs are being shared among employees.", "applicable": "Common", "reviewMethod": "Observation & System Check: Observe login practices on the floor and review system login logs.", "marks": 3.5 },
    { "id": 109, "category": "Brand Login Credential", "requirement": "Check if the login IDs of ex-employees (left employees) are still active or being used.", "applicable": "Common", "reviewMethod": "System Check & Document Review: Cross-reference the active system user list with the HR list of separated employees.", "marks": 3.5 },
    { "id": 110, "category": "Swollen Battery Handling", "requirement": "Check and verify that the emergency sand bucket is positioned immediately adjacent to (within arm's reach of) the Repair desk.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check the physical placement of the sand bucket on the floor.", "marks": 1.0 },
    { "id": 111, "category": "Swollen Battery Handling", "requirement": "Check that all swollen, damaged, or leaking batteries are kept inside the sand bucket (they should be completely dipped in the sand and not visible outside; if found otherwise, guide them to follow the process). Confirm the aging period does not exceed 2 days.", "applicable": "Common", "reviewMethod": "Visual Inspection & Document Review: Inspect the sand bucket and review logs/job sheets.", "marks": 1.0 },
    { "id": 112, "category": "Swollen Battery Handling", "requirement": "Confirm the bucket is painted in a high-visibility safety color (Red/Yellow) and labeled clearly (e.g., 'EMERGENCY SAND - FOR BATTERY THERMAL FIRES ONLY').", "applicable": "Common", "reviewMethod": "Visual Inspection: Verify the color and label of the bucket.", "marks": 1.0 },
    { "id": 113, "category": "Swollen Battery Handling", "requirement": "Check and verify that the bucket is filled to at least 80% to 90% capacity so sufficient volume is readily available to completely smother a burning battery.", "applicable": "Common", "reviewMethod": "Visual Inspection: Check the sand volume level inside the bucket.", "marks": 1.0 },
    { "id": 114, "category": "Swollen Battery Handling", "requirement": "Check and verify the sand is 100% dry, loose, and free-flowing. (Wet or clumped sand will fail to smother lithium fires and can cause hazardous splatter).", "applicable": "Common", "reviewMethod": "Physical Check: Feel or visually inspect the condition of the sand.", "marks": 1.0 },
    { "id": 115, "category": "Swollen Battery Handling", "requirement": "Check and verify the engineer can state/explain when to use sand (at the first sign of battery swelling, smoking, unusual heating, popping sounds, or sparks).", "applicable": "Common", "reviewMethod": "Interview / Knowledge Check: Verbally ask the engineer to explain the emergency procedure.", "marks": 1.0 },
    { "id": 116, "category": "Swollen Battery Handling", "requirement": "Check whether all defective and swollen (IW/OOW) batteries are stored separately.", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect storage areas for proper segregation of defective vs. swollen batteries.", "marks": 1.0 },
    { "id": 117, "category": "Swollen Battery Handling", "requirement": "Check that all swollen batteries are wrapped with a bubble sheet post-discharging energy (minimum 2 hours dipped in the sand) and stored in LIPO pouches along with the job sheets before dispatching.", "applicable": "Common", "reviewMethod": "Observation & Visual Inspection: Check the packaging of outgoing swollen batteries and verify discharge protocols.", "marks": 1.0 },
    { "id": 118, "category": "Swollen Battery Handling", "requirement": "Check that all standard defective batteries are wrapped in a bubble sheet along with the job sheet.", "applicable": "Common", "reviewMethod": "Visual Inspection: Inspect the packaging of outgoing defective batteries.", "marks": 1.0 },
    { "id": 119, "category": "Swollen Battery Handling", "requirement": "Check that all In-Warranty (IW) and swollen batteries are dispatched once every 3 days, and defective battery dispatch occurs once every 5 days.", "applicable": "Common", "reviewMethod": "Document Review: Audit dispatch trackers, courier dockets, and inventory logs for compliance with timelines.", "marks": 1.0 },
    { "id": 120, "category": "Swollen Battery Handling", "requirement": "Check and confirm the availability of LIPO bags (storage capacity 50-100) and LIPO pouches (for storing swollen, damaged, or leaking batteries), with a minimum count of 10. Ensure LIPO pouches are only used for swollen, damaged, or leaking batteries (standard defective batteries do not require them).", "applicable": "Common", "reviewMethod": "Visual Inspection: Physically count the inventory of LIPO bags/pouches and ensure correct usage.", "marks": 1.0 }
  ];

  return data;
}

function saveResult(resultData) {
  try {
    let imageUrl = "N/A";
    
    if (resultData.imageFile && resultData.imageFile.data) {
      const folderIterator = DriveApp.getFoldersByName("Audit_NC_Photos");
      let folder;
      
      if (folderIterator.hasNext()) {
        folder = folderIterator.next();
      } else {
        folder = DriveApp.createFolder("Audit_NC_Photos");
      }
      
      const contentType = resultData.imageFile.mimeType;
      const base64Data = resultData.imageFile.data.split(',')[1];
      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, resultData.imageFile.name);
      const file = folder.createFile(blob);
      imageUrl = file.getUrl();
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Audit_Results');
    if (!sheet) {
      return { success: false, error: "The tab 'Audit_Results' was not found in this Google Sheet. Please create it." };
    }

    sheet.appendRow([
      new Date(),
      resultData.qaName,
      resultData.siteName,
      resultData.omName,
      resultData.id,
      resultData.category,
      resultData.requirement,
      resultData.status,
      resultData.notes || "None",
      imageUrl
    ]);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- DASHBOARD DATA AGGREGATOR ---
function getLiveDashboardData() {
  try {
    SpreadsheetApp.flush(); 

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Audit_Results');
    
    if (!sheet) {
      return { success: false, error: "Audit_Results sheet not found." };
    }

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return { success: false, error: "No audit data available yet." };
    }

    const rows = data.slice(1);
    let siteStats = {};
    
    rows.forEach(row => {
      let date = row[0];
      let site = row[2]; // Column C: Site Name
      let cat = row[5];  // Column F: Category
      let status = row[7]; // Column H: Status
      let notes = row[8]; // Column I: Notes/NC details
      
      if (!site || !status) return;

      if (!siteStats[site]) {
        siteStats[site] = { 
          total: 0, pass: 0, fail: 0, 
          month: date instanceof Date ? Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM") : 'Current',
          ncs: [], 
          categories: new Set() 
        };
      }

      siteStats[site].total++;
      if (status === 'Pass') {
        siteStats[site].pass++;
      } else if (status === 'Fail') {
        siteStats[site].fail++;
        if (notes && notes !== "None") {
          siteStats[site].ncs.push(notes);
        }
        siteStats[site].categories.add(cat);
      }
    });

    let gwicData = [];
    let mbwicData = [];
    let consolidatedData = [];
    let capaData = [];

    let gwicCounter = 1;
    let mbwicCounter = 1;

    Object.keys(siteStats).forEach(site => {
      let stats = siteStats[site];
      let scoreNum = stats.total > 0 ? Math.round((stats.pass / stats.total) * 100) : 0;
      let scoreStr = scoreNum + '%';
      
      let isGwic = site.toUpperCase().includes('GWIC');
      let entityName = isGwic ? 'F1-GWICS' : 'F1-MBWICs';
      
      let catStr = Array.from(stats.categories).join(', ') || '-';
      let obsStr = stats.ncs.join('<br>') || 'No observations';

      let rowObj = {
        site: site,
        month: stats.month,
        score: scoreStr,
        status: 'Completed', 
        link: '#', 
        ncCount: stats.fail,
        category: catStr,
        obs: obsStr
      };

      if (isGwic) {
        rowObj.id = gwicCounter++;
        gwicData.push(rowObj);
      } else {
        rowObj.id = mbwicCounter++;
        mbwicData.push(rowObj);
      }

      consolidatedData.push({
        entity: entityName,
        site: site,
        status: 'Yes',
        ncCount: stats.fail,
        score: scoreStr,
        closure: stats.fail > 0 ? `${stats.fail} Open` : 'Closed',
        category: catStr,
        obs: obsStr
      });

      if (stats.fail > 0) {
        capaData.push({
          site: site,
          totalNc: stats.fail,
          lacking: catStr,
          action: "Pending OM Action Plan formulation based on above NCs."
        });
      }
    });

    consolidatedData.sort((a, b) => a.entity.localeCompare(b.entity));
    let currentEntity = "";
    let countMap = {};
    consolidatedData.forEach(r => countMap[r.entity] = (countMap[r.entity] || 0) + 1);
    
    consolidatedData.forEach(r => {
      if (r.entity !== currentEntity) {
        r.isFirstEntityRow = true;
        r.entityRowspan = countMap[r.entity];
        currentEntity = r.entity;
      } else {
        r.isFirstEntityRow = false;
      }
    });
    
    return {
      success: true,
      gwicData: gwicData,
      mbwicData: mbwicData,
      consolidatedData: consolidatedData,
      capaData: capaData
    };

  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- AUTO EMAIL REPORT LOGIC ---
function sendAuditReportEmail(payload) {
  try {
    const { siteName, qaName, omName, score, reportData, date } = payload;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const spocSheet = ss.getSheetByName('SPOC mapping');
    
    let toEmails = [];
    
    if (spocSheet) {
      const data = spocSheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === siteName) {
          for (let col = 2; col <= 8; col++) {
            if (data[i][col] && data[i][col].toString().includes('@')) {
              toEmails.push(data[i][col].toString().trim());
            }
          }
          break; 
        }
      }
    }
    
    if (toEmails.length === 0) {
      return { success: false, error: "No valid email IDs found in columns C to I for this site on the 'SPOC mapping' tab." };
    }
    
    let ncItems = reportData.filter(item => item.status !== 'Pass');

    let htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 900px; margin: auto; padding: 20px; border: 1px solid #e5e5ea; border-radius: 10px;">
        <h2 style="color:#000; border-bottom: 2px solid #000; padding-bottom: 10px;">ISO 9001:2015 Audit Report</h2>
        <h3 style="color:#666;">Process Operations Audit</h3>
        <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td><strong>Client / Site:</strong> ${siteName}</td>
            <td><strong>Audit Date:</strong> ${date}</td>
          </tr>
          <tr>
            <td><strong>Lead Auditor (QA):</strong> ${qaName}</td>
            <td><strong>Audit Representative (OM):</strong> ${omName}</td>
          </tr>
        </table>
        
        <div style="background-color: #f2f2f7; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
          <h2 style="margin: 0; color: ${score >= 90 ? '#30D158' : '#FF453A'};">OVERALL AUDIT SCORE: ${score}%</h2>
        </div>

        <h4 style="background: #f2f2f7; padding: 10px; margin-bottom: 10px; color: #FF453A;">Non-Conformance (NC) Summary</h4>
        <table style="width:100%; border-collapse: collapse; text-align: left; font-size: 13px; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f2f2f7;">
              <th style="border: 1px solid #d1d1d6; padding: 8px;">ID</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Process / Area</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Findings Description</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Notes / CAPA</th>
            </tr>
          </thead>
          <tbody>`;

    if (ncItems.length === 0) {
      htmlBody += `<tr><td colspan="4" style="border: 1px solid #d1d1d6; padding: 15px; text-align:center; color: green; font-weight:bold;">No Non-Conformances found. Excellent compliance!</td></tr>`;
    } else {
      ncItems.forEach(item => {
        htmlBody += `
          <tr>
            <td style="border: 1px solid #d1d1d6; padding: 8px;">${item.id}</td>
            <td style="border: 1px solid #d1d1d6; padding: 8px;"><strong>${item.category}</strong></td>
            <td style="border: 1px solid #d1d1d6; padding: 8px;">${item.requirement}</td>
            <td style="border: 1px solid #d1d1d6; padding: 8px; color: red; font-weight: bold;">${item.notes}</td>
          </tr>`;
      });
    }

    htmlBody += `
          </tbody>
        </table>

        <h4 style="background: #f2f2f7; padding: 10px; margin-bottom: 10px;">Annex 1: Full Action List</h4>
        <table style="width:100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="background-color: #f2f2f7;">
              <th style="border: 1px solid #d1d1d6; padding: 8px;">ID</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Process / Area</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Findings Description</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Type</th>
              <th style="border: 1px solid #d1d1d6; padding: 8px;">Corrective Action</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    reportData.forEach(item => {
      let isPass = item.status === 'Pass';
      let typeColor = isPass ? '#000' : 'red';
      let typeText = isPass ? 'P' : 'NC';
      let notes = item.notes || 'Positive aspect noted.';
      
      htmlBody += `
        <tr>
          <td style="border: 1px solid #d1d1d6; padding: 8px;">${item.id}</td>
          <td style="border: 1px solid #d1d1d6; padding: 8px;"><strong>${item.category}</strong></td>
          <td style="border: 1px solid #d1d1d6; padding: 8px;">${item.requirement}</td>
          <td style="border: 1px solid #d1d1d6; padding: 8px; color: ${typeColor}; font-weight: bold;">${typeText}</td>
          <td style="border: 1px solid #d1d1d6; padding: 8px;">${notes}</td>
        </tr>
      `;
    });
    
    htmlBody += `</tbody></table></div>`;
    
    MailApp.sendEmail({
      to: toEmails.join(','),
      subject: `ISO 9001:2015 Audit Report - ${siteName} - Score: ${score}%`,
      htmlBody: htmlBody
    });
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

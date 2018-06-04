This tool performs joint timeseries and trend calculation for the HyInt hydroclimatic indices and ETCCDI climate extremes indices over pre-selected continental scale regions or user defined regions. The hydroclimatic indices were selected following Giorgi et al. (2014)':' the simple precipitation intensity index (SDII), the maximum dry spell length (DSL) and wet spell length (WSL), the hydroclimatic intensity index (HY-INT = normalized(SDII) x normalized(DSL)), a measure of the overall behaviour of the hydroclimatic cycle (Giorgi et al., 2011), and the precipitation area (PA), i.e. the area over which at any given day precipitation occurs, (Giorgi et al., 2014). The 27 ETCCDI indices are ingested upon selection from the external extremeEvents namelist for joint analyses. Trends are calculated using the R lm function and significance testing performed with a Student T test on non-null coefficients hypothesis. Trend coefficients are stored together with their statistics which include standard error, t value and Pr(>|t|). The tool produces a variety of types of plots including timeseries with their spread, trend lines and summary plots of trend coefficients. Description of user-changeable settings on webpage':' 1)Selection of model; 2) Selection of period 3) Selection of reference normalization period':' [1990,2000] # to be used for normalized indices; 4) Selection of indices to be plotted':' [1,2,3,4,8,9] # Select one or more fields from the following list (order-sensitive)':' SDII, DSL, WSL, HY-INT, ABS_INT, ABS_DSL, ABS_WSL, PA, R95; 5) Selection of region: [1,2,3,4,5,6,7,8,9,10] # Select regions for timeseries and maps from the following list':' World, World60 (60S/60N), Tropics (30S/30N), South America, Africa , North America, India, Europe, East-Asia, Australia; 6) Type of figure':' 12 # 11) timeseries over required individual region/exp, 12) timeseries over multiple regions/exp, 13) timeseries with multiple models, 14) summary trend coefficients multiple regions, 15) summary trend coefficients multiple models

import type React from "react";
import { type FC, useContext, useEffect, useMemo, useState } from "react";
import { Tooltip, Select } from "@humansignal/ui";
import { cn } from "../../../utils/bem";
import { Range } from "../../../common/Range/Range";
import { IconInfoConfig, IconWarningCircleFilled } from "@humansignal/icons";
import { TimelineContext } from "../Context";
import { Slider } from "./Slider";
import "./SpectrogramControl.prefix.css";
import colormap from "colormap";

// Define Scale Options Type
type SpectrogramScale = "linear" | "log" | "mel";

// Default values
const DEFAULT_FFT_VALUE = 512;
const DEFAULT_MEL_VALUE = 64;
const DEFAULT_WINDOWING_FUNCTION = "blackman";
const DEFAULT_COLOR_SCHEME = "viridis";
const DEFAULT_MIN_DB = -80;
const DEFAULT_MAX_DB = -10;
const DEFAULT_SCALE: SpectrogramScale = "mel";

// FFT Samples Setup
const FFT_SAMPLE_VALUES = [64, 128, 256, 512, 1024, 2048];
const FFT_MARKS = FFT_SAMPLE_VALUES.reduce(
  (acc, val, index) => {
    acc[index] = val.toString();
    return acc;
  },
  {} as Record<number, string>,
);
const DEFAULT_FFT_INDEX = FFT_SAMPLE_VALUES.indexOf(DEFAULT_FFT_VALUE);

// Helper function
const findBestMelBandValue = (fftSize: number): number => {
  const maxAllowedMel = fftSize / 4 - 1;
  return Math.min(maxAllowedMel, DEFAULT_MEL_VALUE);
};

// Windowing Options
const WINDOWING_OPTIONS = [
  { value: "hann", label: "汉宁窗" },
  { value: "hamming", label: "海明窗" },
  { value: "blackman", label: "布莱克曼窗" },
  { value: "sine", label: "正弦窗" },
  { value: "rectangular", label: "矩形窗" },
];

// Colormap Helper functions
const getColorSchemeGradient = (name: any): string => {
  const colors = colormap({
    colormap: name,
    nshades: 16,
    format: "hex",
    alpha: 1,
  });
  return `linear-gradient(to right, ${colors.join(", ")})`;
};

// Restore the function to render label + small box
const renderColorSchemeOption = (label: string, gradient: string) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
    <span>{label}</span>
    <span
      style={{
        display: "inline-block",
        width: "50px",
        height: "10px",
        marginLeft: "10px",
        border: "1px solid var(--sand_300)",
        background: gradient,
      }}
    />
  </div>
);

// Generate COLOR_SCHEME_OPTIONS with label + box
const COLOR_SCHEME_OPTIONS: { label: React.ReactNode; value: string; key: string }[] = [
  { label: renderColorSchemeOption("秋色", getColorSchemeGradient("autumn")), value: "autumn", key: "autumn" },
  {
    label: renderColorSchemeOption("测深", getColorSchemeGradient("bathymetry")),
    value: "bathymetry",
    key: "bathymetry",
  },
  {
    label: renderColorSchemeOption("黑体", getColorSchemeGradient("blackbody")),
    value: "blackbody",
    key: "blackbody",
  },
  { label: renderColorSchemeOption("蓝红", getColorSchemeGradient("bluered")), value: "bluered", key: "bluered" },
  { label: renderColorSchemeOption("骨色", getColorSchemeGradient("bone")), value: "bone", key: "bone" },
  { label: renderColorSchemeOption("CDOM", getColorSchemeGradient("cdom")), value: "cdom", key: "cdom" },
  {
    label: renderColorSchemeOption("叶绿素", getColorSchemeGradient("chlorophyll")),
    value: "chlorophyll",
    key: "chlorophyll",
  },
  { label: renderColorSchemeOption("冷色", getColorSchemeGradient("cool")), value: "cool", key: "cool" },
  { label: renderColorSchemeOption("铜色", getColorSchemeGradient("copper")), value: "copper", key: "copper" },
  {
    label: renderColorSchemeOption("立方螺旋", getColorSchemeGradient("cubehelix")),
    value: "cubehelix",
    key: "cubehelix",
  },
  { label: renderColorSchemeOption("密度", getColorSchemeGradient("density")), value: "density", key: "density" },
  { label: renderColorSchemeOption("地表", getColorSchemeGradient("earth")), value: "earth", key: "earth" },
  {
    label: renderColorSchemeOption("电光", getColorSchemeGradient("electric")),
    value: "electric",
    key: "electric",
  },
  {
    label: renderColorSchemeOption("自由表面蓝", getColorSchemeGradient("freesurface-blue")),
    value: "freesurface-blue",
    key: "freesurface-blue",
  },
  {
    label: renderColorSchemeOption("自由表面红", getColorSchemeGradient("freesurface-red")),
    value: "freesurface-red",
    key: "freesurface-red",
  },
  { label: renderColorSchemeOption("绿色", getColorSchemeGradient("greens")), value: "greens", key: "greens" },
  { label: renderColorSchemeOption("灰度", getColorSchemeGradient("greys")), value: "greys", key: "greys" },
  { label: renderColorSchemeOption("热度", getColorSchemeGradient("hot")), value: "hot", key: "hot" },
  { label: renderColorSchemeOption("HSV", getColorSchemeGradient("hsv")), value: "hsv", key: "hsv" },
  { label: renderColorSchemeOption("炼狱", getColorSchemeGradient("inferno")), value: "inferno", key: "inferno" },
  { label: renderColorSchemeOption("喷射", getColorSchemeGradient("jet")), value: "jet", key: "jet" },
  { label: renderColorSchemeOption("岩浆", getColorSchemeGradient("magma")), value: "magma", key: "magma" },
  { label: renderColorSchemeOption("氧气", getColorSchemeGradient("oxygen")), value: "oxygen", key: "oxygen" },
  { label: renderColorSchemeOption("PAR", getColorSchemeGradient("par")), value: "par", key: "par" },
  { label: renderColorSchemeOption("相位", getColorSchemeGradient("phase")), value: "phase", key: "phase" },
  { label: renderColorSchemeOption("野餐", getColorSchemeGradient("picnic")), value: "picnic", key: "picnic" },
  { label: renderColorSchemeOption("等离子", getColorSchemeGradient("plasma")), value: "plasma", key: "plasma" },
  {
    label: renderColorSchemeOption("波特兰", getColorSchemeGradient("portland")),
    value: "portland",
    key: "portland",
  },
  { label: renderColorSchemeOption("彩虹", getColorSchemeGradient("rainbow")), value: "rainbow", key: "rainbow" },
  {
    label: renderColorSchemeOption("柔和彩虹", getColorSchemeGradient("rainbow-soft")),
    value: "rainbow-soft",
    key: "rainbow-soft",
  },
  { label: renderColorSchemeOption("RdBu", getColorSchemeGradient("RdBu")), value: "RdBu", key: "RdBu" },
  {
    label: renderColorSchemeOption("盐度", getColorSchemeGradient("salinity")),
    value: "salinity",
    key: "salinity",
  },
  { label: renderColorSchemeOption("春季", getColorSchemeGradient("spring")), value: "spring", key: "spring" },
  { label: renderColorSchemeOption("夏季", getColorSchemeGradient("summer")), value: "summer", key: "summer" },
  {
    label: renderColorSchemeOption("温度", getColorSchemeGradient("temperature")),
    value: "temperature",
    key: "temperature",
  },
  {
    label: renderColorSchemeOption("浊度", getColorSchemeGradient("turbidity")),
    value: "turbidity",
    key: "turbidity",
  },
  {
    label: renderColorSchemeOption("速度蓝", getColorSchemeGradient("velocity-blue")),
    value: "velocity-blue",
    key: "velocity-blue",
  },
  {
    label: renderColorSchemeOption("速度绿", getColorSchemeGradient("velocity-green")),
    value: "velocity-green",
    key: "velocity-green",
  },
  { label: renderColorSchemeOption("翠绿", getColorSchemeGradient("viridis")), value: "viridis", key: "viridis" },
  { label: renderColorSchemeOption("暖色", getColorSchemeGradient("warm")), value: "warm", key: "warm" },
  { label: renderColorSchemeOption("冬季", getColorSchemeGradient("winter")), value: "winter", key: "winter" },
  { label: renderColorSchemeOption("YIGnBu", getColorSchemeGradient("YIGnBu")), value: "YIGnBu", key: "YIGnBu" },
  { label: renderColorSchemeOption("YIOrRd", getColorSchemeGradient("YIOrRd")), value: "YIOrRd", key: "YIOrRd" },
].sort((a, b) => a.value.localeCompare(b.value));

// Scale Options
const SCALE_OPTIONS: { label: string; value: SpectrogramScale }[] = [
  { value: "linear", label: "线性频率" },
  { value: "log", label: "对数频率" },
  { value: "mel", label: "Mel 标度" },
];

export interface SpectrogramControlProps {
  waveform: Waveform;
}

type Waveform = {};

export const SpectrogramControl: FC<SpectrogramControlProps> = ({ waveform }) => {
  const { settings, changeSetting } = useContext(TimelineContext);
  const [fftInputText, setFftInputText] = useState<string>(DEFAULT_FFT_VALUE.toString());
  const [fftInputError, setFftInputError] = useState<boolean>(false);

  // Calculate initial index based on current value from settings
  const currentFftValue = useMemo(
    () => settings?.spectrogramFftSamples ?? DEFAULT_FFT_VALUE,
    [settings?.spectrogramFftSamples],
  );
  const initialFftIndex = useMemo(() => {
    const index = FFT_SAMPLE_VALUES.indexOf(currentFftValue);
    return index !== -1 ? index : DEFAULT_FFT_INDEX !== -1 ? DEFAULT_FFT_INDEX : 3;
  }, [currentFftValue]);

  // State for the slider's current index
  const [fftSliderIndex, setFftSliderIndex] = useState(initialFftIndex);

  // Initialize displayColorScheme from settings
  const [displayColorScheme, setDisplayColorScheme] = useState(
    settings?.spectrogramColorScheme ?? DEFAULT_COLOR_SCHEME,
  );

  // Initialize displayDbRange from settings
  const [displayMinDb, setDisplayMinDb] = useState(settings?.spectrogramMinDb ?? DEFAULT_MIN_DB);
  const [displayMaxDb, setDisplayMaxDb] = useState(settings?.spectrogramMaxDb ?? DEFAULT_MAX_DB);

  // Add state for the scale
  const [displayScale, setDisplayScale] = useState<SpectrogramScale>(settings?.spectrogramScale ?? DEFAULT_SCALE);

  useEffect(() => {
    setFftInputText(currentFftValue.toString());
    setFftInputError(false);
  }, [currentFftValue]);

  // Update local state when settings change
  useEffect(() => {
    const newColorScheme = settings?.spectrogramColorScheme;
    if (newColorScheme && newColorScheme !== displayColorScheme) {
      setDisplayColorScheme(newColorScheme);
    }
  }, [settings?.spectrogramColorScheme]);

  useEffect(() => {
    const newMinDb = settings?.spectrogramMinDb;
    const newMaxDb = settings?.spectrogramMaxDb;
    if (newMinDb !== undefined && newMinDb !== displayMinDb) {
      setDisplayMinDb(newMinDb);
    }
    if (newMaxDb !== undefined && newMaxDb !== displayMaxDb) {
      setDisplayMaxDb(newMaxDb);
    }
  }, [settings?.spectrogramMinDb, settings?.spectrogramMaxDb]);

  // Update local scale state when settings change
  useEffect(() => {
    const newScale = settings?.spectrogramScale;
    if (newScale && newScale !== displayScale) {
      setDisplayScale(newScale);
    }
  }, [settings?.spectrogramScale]);

  // Effect to sync local slider state with external changes
  useEffect(() => {
    setFftSliderIndex(initialFftIndex);
    setFftInputText(FFT_SAMPLE_VALUES[initialFftIndex]?.toString() ?? DEFAULT_FFT_VALUE.toString());
    setFftInputError(false);
  }, [initialFftIndex]);

  const handleChangeFftSamples = (e: React.FormEvent<HTMLInputElement> | number) => {
    const sliderIndex =
      typeof e === "number" ? e : Number.parseInt((e as React.FormEvent<HTMLInputElement>).currentTarget.value);
    if (!isNaN(sliderIndex)) {
      const clampedIndex = Math.max(0, Math.min(sliderIndex, FFT_SAMPLE_VALUES.length - 1));
      const actualFftValue = FFT_SAMPLE_VALUES[clampedIndex];

      if (actualFftValue !== undefined) {
        changeSetting?.("spectrogramFftSamples", actualFftValue);

        const targetMelValue = findBestMelBandValue(actualFftValue);
        const currentMelValueFromState = settings?.numberOfMelBands ?? DEFAULT_MEL_VALUE;
        if (targetMelValue !== currentMelValueFromState) {
          changeSetting?.("numberOfMelBands", targetMelValue);
        }
      }
    }
  };

  const handleChangeNumberOfMelBands = (e: React.FormEvent<HTMLInputElement> | number) => {
    const actualMelValue =
      typeof e === "number" ? e : Number.parseInt((e as React.FormEvent<HTMLInputElement>).currentTarget.value);
    if (!isNaN(actualMelValue)) {
      changeSetting?.("numberOfMelBands", actualMelValue);
    }
  };

  const handleChangeWindowingFunction = (value: string) => {
    changeSetting?.("spectrogramWindowingFunction", value);
  };

  const handleChangeColorScheme = (value: string) => {
    setDisplayColorScheme(value);
    changeSetting?.("spectrogramColorScheme", value);
  };

  const handleChangeScale = (value: SpectrogramScale) => {
    setDisplayScale(value);
    changeSetting?.("spectrogramScale", value);
  };

  const handleFftInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setFftInputText(inputText);

    const parsedValue = Number.parseInt(inputText);

    if (!isNaN(parsedValue) && FFT_SAMPLE_VALUES.includes(parsedValue)) {
      setFftInputError(false);
      const index = FFT_SAMPLE_VALUES.indexOf(parsedValue);
      handleChangeFftSamples(index);
    } else {
      setFftInputError(true);
    }
  };

  const handleChangeFftSamplesSlider = (e: React.FormEvent<HTMLInputElement> | number) => {
    const sliderIndex =
      typeof e === "number" ? e : Number.parseInt((e as React.FormEvent<HTMLInputElement>).currentTarget.value);
    if (!isNaN(sliderIndex)) {
      const clampedIndex = Math.max(0, Math.min(sliderIndex, FFT_SAMPLE_VALUES.length - 1));
      const actualFftValue = FFT_SAMPLE_VALUES[clampedIndex];

      if (actualFftValue !== undefined) {
        changeSetting?.("spectrogramFftSamples", actualFftValue);

        // Update local slider index state
        setFftSliderIndex(clampedIndex);
        setFftInputText(actualFftValue.toString());
        setFftInputError(false);

        const targetMelValue = findBestMelBandValue(actualFftValue);
        const currentMelValueFromState = settings?.numberOfMelBands ?? DEFAULT_MEL_VALUE;
        if (targetMelValue !== currentMelValueFromState) {
          changeSetting?.("numberOfMelBands", targetMelValue);
        }
      }
    }
  };

  const [lastUpdate, setLastUpdate] = useState<{ min: number; max: number; time: number } | null>(null);

  const handleDbRangeChange = (values: number[]) => {
    if (!Array.isArray(values) || values.length !== 2) {
      return;
    }

    const [newMinDb, newMaxDb] = values;

    // Basic validation
    if (isNaN(newMinDb) || isNaN(newMaxDb) || newMinDb >= newMaxDb) {
      return;
    }

    // Prevent rapid updates with unstable values
    const currentTime = Date.now();
    if (lastUpdate && currentTime - lastUpdate.time < 100) {
      // If we're getting a quick update that would change max when we're moving min
      if (lastUpdate.min === newMinDb && lastUpdate.max !== newMaxDb && newMaxDb !== displayMaxDb) {
        return;
      }
      // If we're getting a quick update that would change min when we're moving max
      if (lastUpdate.max === newMaxDb && lastUpdate.min !== newMinDb && newMinDb !== displayMinDb) {
        return;
      }
    }

    // Update last update time
    setLastUpdate({ min: newMinDb, max: newMaxDb, time: currentTime });

    // Update local state
    setDisplayMinDb(newMinDb);
    setDisplayMaxDb(newMaxDb);

    // Update context settings
    changeSetting?.("spectrogramMinDb", newMinDb);
    changeSetting?.("spectrogramMaxDb", newMaxDb);
  };

  const handleRangeChange = (value: string | number | number[]) => {
    // Convert string or single number to array if needed
    const valueArray = Array.isArray(value) ? value : [Number(value)];

    if (!Array.isArray(valueArray) || valueArray.length !== 2) return;

    let [newMin, newMax] = valueArray.map(Math.round);

    // Determine which handle is moving
    const isMinMoving = newMin !== displayMinDb;
    const isMaxMoving = newMax !== displayMaxDb;

    // If only min is moving, preserve current max
    if (isMinMoving && !isMaxMoving) {
      newMax = displayMaxDb;
    }
    // If only max is moving, preserve current min
    else if (isMaxMoving && !isMinMoving) {
      newMin = displayMinDb;
    }

    // Ensure values stay within bounds
    newMin = Math.max(-120, Math.min(0, newMin));
    newMax = Math.max(-120, Math.min(0, newMax));

    // Ensure min is always less than max
    if (newMin >= newMax) {
      if (isMinMoving) {
        newMin = Math.min(newMin, newMax - 1);
      } else {
        newMax = Math.max(newMax, newMin + 1);
      }
    }
    handleDbRangeChange([newMin, newMax]);
  };

  const showWarning =
    Number(fftInputText) > 1024 || (displayScale === "mel" && (settings?.numberOfMelBands ?? DEFAULT_MEL_VALUE) > 140);

  const fftInfoText = "数值越高，频率分辨率越高，但计算量也会增加。";
  const displayMelBands = settings?.numberOfMelBands ?? DEFAULT_MEL_VALUE;
  const displayWindowFunc = settings?.spectrogramWindowingFunction ?? DEFAULT_WINDOWING_FUNCTION;
  const isMelScaleSelected = displayScale === "mel";

  return (
    <div className={cn("spectrogram-controls").toClassName()}>
      {showWarning && (
        <Tooltip title="过高的 FFT 或 Mel 频带值可能导致性能问题或显示伪影。">
          <IconWarningCircleFilled
            style={{
              color: "var(--color-warning-icon, #faad14)",
              position: "absolute",
              top: 1,
              right: 15,
              width: 22,
              zIndex: 10,
              cursor: "pointer",
              filter: "drop-shadow(0 2px 6px var(--color-warning-shadow, rgba(0,0,0,0.25)))",
              transition: "color 0.2s",
            }}
          />
        </Tooltip>
      )}
      <div className={cn("spectrogram-controls").elem("slider-container").toClassName()}>
        <Slider
          min={0}
          max={FFT_SAMPLE_VALUES.length - 1}
          step={1}
          value={fftSliderIndex}
          showInput={false}
          onChange={handleChangeFftSamplesSlider}
        />
        <div className={cn("spectrogram-controls").elem("control").toClassName()}>
          <div className={cn("spectrogram-controls").elem("info").toClassName()}>
            FFT 采样数
            <Tooltip title={fftInfoText}>
              <IconInfoConfig />
            </Tooltip>
          </div>
          <input
            className={cn("spectrogram-controls").elem("input").mod({ error: fftInputError }).toClassName()}
            type="text"
            value={fftInputText}
            onChange={handleFftInputChange}
          />
        </div>
      </div>
      <div className={cn("spectrogram-controls").elem("spectrogram-controls").toClassName()}>
        <div className={cn("spectrogram-controls").elem("info").toClassName()}>
          频率刻度
          <Tooltip title="决定频率刻度映射方式：线性、对数或 Mel（感知）刻度。">
            <IconInfoConfig />
          </Tooltip>
        </div>
        <Select value={displayScale} onChange={handleChangeScale} options={SCALE_OPTIONS} style={{ width: "100%" }} />
      </div>
      {isMelScaleSelected && (
        <div className={cn("spectrogram-controls").elem("spectrogram-controls").toClassName()}>
          <Slider
            min={20}
            max={220}
            step={1}
            value={displayMelBands}
            description={"Mel 频带数量"}
            info={"指定使用 Mel 刻度时的频率分带数量。"}
            onChange={handleChangeNumberOfMelBands}
          />
        </div>
      )}
      <div className={cn("spectrogram-controls").elem("spectrogram-controls").toClassName()}>
        <Range
          multi
          continuous
          min={-120}
          max={0}
          step={1}
          value={[displayMinDb, displayMaxDb]}
          resetValue={[DEFAULT_MIN_DB, DEFAULT_MAX_DB]}
          onChange={handleRangeChange}
          size={200}
        />
        <div className={cn("spectrogram-controls").elem("control").toClassName()}>
          <div className={cn("spectrogram-controls").elem("info").toClassName()}>
            频谱图 dB
            <Tooltip title="控制频谱图中显示的分贝范围。数值越低，显示的声音越安静。">
              <IconInfoConfig />
            </Tooltip>
          </div>
          <div className={cn("spectrogram-controls").elem("input-group").toClassName()}>
            <input
              className={cn("spectrogram-controls").elem("input").toClassName()}
              type="number"
              value={displayMinDb}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                if (!isNaN(value) && value <= displayMaxDb - 10) {
                  handleDbRangeChange([value, displayMaxDb]);
                }
              }}
              min={-120}
              max={displayMaxDb - 10}
            />
            <span className={cn("spectrogram-controls").elem("separator").toClassName()}>到</span>
            <input
              className={cn("spectrogram-controls").elem("input").toClassName()}
              type="number"
              value={displayMaxDb}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                if (!isNaN(value) && value >= displayMinDb + 10) {
                  handleDbRangeChange([displayMinDb, value]);
                }
              }}
              min={displayMinDb + 10}
              max={0}
            />
          </div>
        </div>
      </div>
      <div className={cn("spectrogram-controls").elem("spectrogram-controls").toClassName()}>
        <div className={cn("spectrogram-controls").elem("label").toClassName()}>窗函数</div>
        <Select
          value={displayWindowFunc}
          onChange={handleChangeWindowingFunction}
          options={WINDOWING_OPTIONS}
          style={{ width: "100%" }}
        />
      </div>
      <div className={cn("spectrogram-controls").elem("spectrogram-controls").toClassName()}>
        <div className={cn("spectrogram-controls").elem("label").toClassName()}>配色方案</div>
        <Select
          value={displayColorScheme}
          onChange={handleChangeColorScheme}
          style={{
            width: "100%",
          }}
          options={COLOR_SCHEME_OPTIONS}
          listHeight={320}
          className="color-scheme-select"
        />
      </div>
    </div>
  );
};

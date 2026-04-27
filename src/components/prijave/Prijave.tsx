import { useState, type CSSProperties } from 'react'
import logo from '../../assets/logo.svg'
import submitButtonDefault from '../../assets/submit-no-hover.svg'
import submitButtonHover from '../../assets/submit-hover.svg'


type SectionKey = 'uvod' | 'tech' | 'panel' | 'speed'
type ProjectKey = Exclude<SectionKey, 'uvod'>

const isProjectSectionKey = (key: SectionKey): key is ProjectKey => key !== 'uvod'

type NavItem = {
  key: SectionKey
  label: string
  shortLabel: string
}

type SelectOption =
  | string
  | {
      label: string
      value?: string
      disabled?: boolean
    }

const navItems: NavItem[] = [
  { key: 'uvod', label: 'UVOD', shortLabel: 'UVOD' },
  { key: 'tech', label: 'TECH CHALLENGE', shortLabel: 'TECH' },
  { key: 'panel', label: 'PANEL DISKUSIJA', shortLabel: 'PANEL' },
  { key: 'speed', label: 'SPEED DATING', shortLabel: 'SPEED' },
]

const progressMap: Record<SectionKey, number> = {
  uvod: 26,
  tech: 41,
  panel: 63,
  speed: 90,
}

const studyYearOptions = [
  'Prva godina',
  'Druga godina',
  'Treća godina',
  'Četvrta godina',
  'Peta godina',
  'Master studije',
  'Doktorske studije',
]

const facultyOptions: SelectOption[] = [
  { label: '----- Fakulteti u Beogradu -----', disabled: true },
  'Fakultet organizacionih nauka',
  'Fakultet za fizičku hemiju',
  'Matematički fakultet',
  'Ekonomski fakultet',
  'Arhitektonski fakultet',
  'Fakultet za specijalnu edukaciju i rehabilitaciju',
  'Fakultet muzičke umetnosti',
  'Fizički fakultet',
  'Fakultet sporta i fizičkog vaspitanja',
  'Filološki fakultet',
  'Građevinski fakultet',
  'Medicinski fakultet',
  'Saobraćajni fakultet',
  'Biološki fakultet',
  'Fakultet veterinarske medicine',
  'Filozofski fakultet',
  'Hemijski fakultet',
  'Pravni fakultet',
  'Stomatološki fakultet',
  'Učiteljski fakultet',
  'Vojna akademija',
  'Fakultet dramskih umetnosti',
  'Fakultet političkih nauka',
  'Mašinski fakultet',
  'Kriminalističko policijska akademija',
  'Pravoslavni bogoslovski fakultet',
  'Poljoprivredni fakultet',
  'Šumarski fakultet',
  'Vojnomedicinska akademija',
  'Elektrotehnički fakultet',
  'Fakultet likovnih umetnosti',
  'Fakultet primenjenih umetnosti',
  'Fakultet bezbednosti',
  'Farmaceutski fakultet',
  'Geografski fakultet',
  'Rudarsko-geološki fakultet',
  'Tehnološko-metalurški fakultet',
  { label: '----- Fakulteti u Novom Sadu -----', disabled: true },
  'Tehnološki fakultet',
  'Prirodno-matematički fakultet',
  'Akademija umetnosti',
  'Fakultet tehničkih nauka',
  'Drugi fakultet',
]

const pageStyle: CSSProperties = {
  '--c2s-design-w': '1240px',
  '--c2s-design-h': '760px',
  '--c2s-scale':
    'min(0.92, calc((100svh - 24px) / var(--c2s-design-h)), calc((100vw - 28px) / var(--c2s-design-w)))',
  '--c2s-form-label-size':
    'max(clamp(10px, 0.28vw + 8px, 14px), calc(10px / var(--c2s-scale)))',
  '--c2s-form-input-size':
    'max(clamp(15px, 0.45vw + 12px, 20px), calc(15px / var(--c2s-scale)))',
  '--c2s-form-hint-size':
    'max(clamp(10px, 0.22vw + 8px, 13px), calc(9px / var(--c2s-scale)))',
  '--c2s-form-check-size':
    'max(clamp(14px, 0.5vw + 12px, 20px), calc(16px / var(--c2s-scale)))',
  } as CSSProperties & Record<string, string>

const pageClassName =
  'font-c2s flex min-h-screen w-full justify-center overflow-x-hidden overflow-y-auto bg-[#0D0E0F] px-[14px] py-[12px] text-[#FFFFFF] max-[1150px]:block max-[1150px]:px-3 max-[1150px]:py-3 max-[640px]:px-2 max-[640px]:py-2'
const stageClassName =
  'h-[calc(var(--c2s-design-h)*var(--c2s-scale))] w-[calc(var(--c2s-design-w)*var(--c2s-scale))] overflow-visible max-[1150px]:h-auto max-[1150px]:w-full'
const shellClassName =
  'h-[760px] w-[1240px] origin-top-left max-[1150px]:h-auto max-[1150px]:w-full max-[1150px]:transform-none'
const headerClassName =
  'mb-0 flex items-start justify-between gap-4 max-[1150px]:flex-col max-[1150px]:gap-3.5 min-[1500px]:mb-0'
const logoClassName =
  'block h-auto w-[clamp(170px,20vw,250px)] max-w-full max-[1150px]:w-[clamp(120px,35vw,220px)] max-[640px]:w-[clamp(100px,30vw,180px)] max-[640px]:translate-y-16'
const submitButtonClassName =
  'group relative self-end mb-[12px] aspect-[273/81] w-[clamp(230px,22vw,273px)] cursor-pointer border-0 bg-transparent p-0 max-[1150px]:mb-0 max-[1150px]:w-full max-[1150px]:max-w-[220px] max-[640px]:max-w-[160px]'
const submitImageClassName =
  'absolute inset-0 h-full w-full object-contain transition-opacity duration-200'
const navButtonClassName = 'group w-full cursor-pointer border-0 bg-transparent p-0 text-left max-[640px]:mb-0 max-[640px]:px-0 max-[640px]:text-center'
const navRowClassName = 'flex items-start justify-between gap-2.5 max-[1150px]:flex-col max-[640px]:flex-row max-[640px]:items-center max-[640px]:justify-center max-[640px]:gap-1'
const navLabelBaseClassName =
  'relative m-0 max-w-none uppercase text-[28px] font-bold leading-[0.96] tracking-[0.1em] text-[#FFFFFF]/95 transition-colors group-hover:text-[#FFFFFF] max-[1150px]:text-[20px] max-[1150px]:tracking-[0.12em] max-[640px]:text-[18px] max-[640px]:tracking-[0.04em] max-[640px]:leading-[0.8]'
const navLabelStackClassName = 'flex flex-col items-start gap-[0.05em] max-[640px]:items-center'
const navStrikeTextClassName = 'relative inline-block leading-none'
const navStrikeOverlayClassName =
  'pointer-events-none absolute left-0 top-[0.55em] h-[3px] w-full origin-left bg-[#E31E2F] transition-transform duration-300 ease-out'
const navArrowBaseClassName =
  'mt-1 text-[28px] leading-none transition-[color,transform] group-hover:text-[#E31E2F] group-hover:-translate-y-px group-hover:rotate-[-18deg] max-[1150px]:text-[22px] max-[640px]:text-[14px] max-[640px]:mt-0.5'
const navUnderlineClassName = 'mt-2.5 h-[2px] w-[182px] bg-[#FFFFFF]/85 max-[1150px]:w-full max-[640px]:hidden'
const navMobileUnderlineClassName = 'hidden h-[1px] w-full bg-[#FFFFFF]/85 max-[640px]:col-span-4 max-[640px]:mt-1.5 max-[640px]:block'
const layoutClassName =
  'grid grid-cols-[250px_minmax(0,1fr)] items-start gap-[26px] max-[1150px]:grid-cols-1 max-[1150px]:gap-3 max-[640px]:gap-2 min-[1500px]:grid-cols-[270px_minmax(0,1fr)] min-[1500px]:gap-[78px]'
const navClassName = 'pt-1 max-[1150px]:grid max-[1150px]:grid-cols-2 max-[1150px]:gap-[14px] max-[640px]:grid max-[640px]:grid-cols-4 max-[640px]:gap-2 max-[640px]:pb-2'
const contentClassName = 'min-w-0 pt-[2px] min-[1500px]:pt-[6px]'
const fieldTitleClassName =
  'mb-1.5 text-[28px] font-bold leading-[1.1] tracking-[0.16em] text-[#FFFFFF] uppercase max-[1150px]:text-[22px] max-[640px]:text-[18px] min-[1500px]:text-[28px]'
const panelThemeClassName =
  'mb-3.5 text-[26px] uppercase tracking-[0.08em] text-[#FFFFFF]/90 max-[1150px]:text-[20px] max-[640px]:text-[16px]'
const gridTwoClassName = 'grid grid-cols-2 gap-2.5 max-[1150px]:grid-cols-1 max-[1150px]:gap-2 max-[640px]:gap-1.5 min-[1500px]:gap-4'
const mt4ClassName = 'mt-2.5'
const mt5ClassName = 'mt-3'
const mt6ClassName = 'mt-3.5'
const mb7ClassName = 'mb-3.5'
const labelClassName =
  'mb-[5px] block text-(--c2s-form-label-size) font-bold uppercase tracking-[0.28em] text-[#FFFFFF]'
const inputBaseClassName =
  'h-[clamp(34px,1.15vw+30px,44px)] w-full rounded-full border border-[#C6172F] bg-[#6A0B20] px-2.5 text-(--c2s-form-input-size) leading-none text-[#FFFFFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] placeholder:text-[#FFFFFF]/60 focus:outline focus:outline-2 focus:outline-[#E31E2F] disabled:cursor-not-allowed disabled:border-[#4E0610] disabled:bg-[#4E0610] disabled:text-[#FFFFFF]/45 disabled:placeholder:text-[#FFFFFF]/25 max-[640px]:text-sm max-[640px]:px-2'
const selectClassName = `${inputBaseClassName} appearance-none cursor-pointer pr-[42px]`
const chevronClassName =
  'pointer-events-none absolute right-2.5 top-1/2 grid h-[22px] w-[22px] -translate-y-1/2 place-items-center rounded-full border border-[#FFFFFF]/65 text-[clamp(14px,0.35vw+12px,18px)] leading-none text-[#FFFFFF]/95'
const textAreaClassName =
  'min-h-[clamp(74px,1.9vw+62px,110px)] w-full resize-none rounded-[18px] border border-[#C6172F] bg-[#6A0B20] px-3 py-2.5 text-(--c2s-form-input-size) leading-[1.35] text-[#FFFFFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] placeholder:text-[#FFFFFF]/55 focus:outline focus:outline-2 focus:outline-[#E31E2F] disabled:cursor-not-allowed disabled:border-[#4E0610] disabled:bg-[#4E0610] disabled:text-[#FFFFFF]/45 disabled:placeholder:text-[#FFFFFF]/25 max-[640px]:text-sm max-[640px]:px-2 max-[640px]:py-2'
const hintClassName =
  'mt-1 border-l border-[#FFFFFF]/45 pl-[7px] text-(--c2s-form-hint-size) text-[#FFFFFF]/40'
const panelStripClassName = 'my-2.5 border-l-2 border-[#FFFFFF]/60 pl-3 max-[640px]:my-2 max-[640px]:pl-2.5 min-[1500px]:my-4'
const subtitleClassName =
  'mb-1.5 text-[13px] font-semibold uppercase tracking-[0.17em] text-[#FFFFFF] max-[640px]:text-[11px] max-[640px]:mb-1'
const checkListClassName = 'pt-1'
const checkBaseClassName = 'flex items-start gap-2.5 leading-[1.2]'
const checkBoxClassName =
  'mt-px grid h-[17px] w-[17px] shrink-0 place-items-center rounded-[3px] border border-[#E31E2F] transition-colors peer-checked:border-[#E31E2F] peer-checked:bg-[#E31E2F]'
const disabledSectionClassName = 'opacity-45'

const renderLabelText = (label: string) =>
  label.split('*').flatMap((part, index, parts) => {
    if (index === parts.length - 1) {
      return part
    }

    return [
      part,
      <span key={`${label}-${index}`} className="text-[#E31E2F]">
        *
      </span>,
    ]
  })

const C2SRegistrationPage = () => {
  const [active, setActive] = useState<SectionKey>('uvod')
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [customFaculty, setCustomFaculty] = useState('')
  const [projectParticipation, setProjectParticipation] = useState<Record<ProjectKey, boolean>>({
    tech: true,
    panel: true,
    speed: true,
  })

  const setProjectSelected = (key: ProjectKey, value: boolean) => {
    setProjectParticipation((prev) => ({ ...prev, [key]: value }))
  }

  const onlyPanelSelected =
    projectParticipation.panel && !projectParticipation.tech && !projectParticipation.speed

  return (
    <div className={pageClassName} style={pageStyle}>
      <div className={stageClassName}>
        <div className={shellClassName} style={{ transform: 'scale(var(--c2s-scale))', transformOrigin: 'top left' }}>
          <header className={headerClassName}>
            <div className="flex items-center pt-1">
              <img src={logo} alt="Companies to Students" className={logoClassName} />
            </div>

            <button type="button" className={submitButtonClassName} aria-label="Pošalji prijavu">
              <img
                src={submitButtonDefault}
                alt=""
                aria-hidden="true"
                className={`${submitImageClassName} opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0`}
              />
              <img
                src={submitButtonHover}
                alt=""
                aria-hidden="true"
                className={`${submitImageClassName} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
              />
            </button>
          </header>

          <div className="mb-4.5 h-0.5 bg-[#FFFFFF]/75 min-[1500px]:mb-7.5">
            <div
              className="h-full bg-[#C6172F] transition-[width] duration-200"
              style={{ width: `${progressMap[active]}%` }}
            />
          </div>

          <div className={layoutClassName}>
            <aside className={navClassName}>
              {navItems.map((item) => {
                const isActive = item.key === active
                const isDisabledCategory = isProjectSectionKey(item.key) && !projectParticipation[item.key]
                const navLabelWords = item.label.split(' ')
                const mobileLabelWords = item.shortLabel.split(' ')

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActive(item.key)}
                    className={`${navButtonClassName} mb-5 min-[1500px]:mb-7.5 max-[1150px]:mb-0`}
                  >
                    <div className={navRowClassName}>
                      <p className={`${navLabelBaseClassName} ${isActive ? 'text-[#FFFFFF]' : ''}`}>
                        <span className={`${navLabelStackClassName} block max-[640px]:hidden`}>
                          {navLabelWords.map((word) => (
                            <span key={`${item.key}-${word}`} className={navStrikeTextClassName}>
                              {word}
                              <span
                                className={`${navStrikeOverlayClassName} ${
                                  isDisabledCategory ? 'scale-x-100' : 'scale-x-0'
                                }`}
                              />
                            </span>
                          ))}
                        </span>
                        <span className={`${navLabelStackClassName} hidden max-[640px]:flex`}>
                          {mobileLabelWords.map((word) => (
                            <span key={`${item.key}-mobile-${word}`} className={navStrikeTextClassName}>
                              {word}
                              <span
                                className={`${navStrikeOverlayClassName} ${
                                  isDisabledCategory ? 'scale-x-100' : 'scale-x-0'
                                }`}
                              />
                            </span>
                          ))}
                        </span>
                      </p>
                      <span
                        className={`${navArrowBaseClassName} ${
                          isActive
                            ? 'text-[#E31E2F] -translate-y-px rotate-[-18deg]'
                            : 'text-[#FFFFFF]/90'
                        }`}
                      >
                        →
                      </span>
                    </div>
                    <div className={navUnderlineClassName} />
                  </button>
                )
              })}
              <div className={navMobileUnderlineClassName} />
            </aside>

            <main className={contentClassName}>
              {active === 'uvod' && (
                <UvodScreen
                  projectParticipation={projectParticipation}
                  onProjectChange={setProjectSelected}
                  selectedFaculty={selectedFaculty}
                  onFacultyChange={setSelectedFaculty}
                  customFaculty={customFaculty}
                  onCustomFacultyChange={setCustomFaculty}
                  onlyPanelSelected={onlyPanelSelected}
                />
              )}
              {active === 'tech' && <TechScreen disabled={!projectParticipation.tech} />}
              {active === 'panel' && <PanelScreen disabled={!projectParticipation.panel} />}
              {active === 'speed' && <SpeedDatingScreen disabled={!projectParticipation.speed} />}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

type UvodScreenProps = {
  projectParticipation: Record<ProjectKey, boolean>
  onProjectChange: (key: ProjectKey, value: boolean) => void
  selectedFaculty: string
  onFacultyChange: (value: string) => void
  customFaculty: string
  onCustomFacultyChange: (value: string) => void
  onlyPanelSelected: boolean
}

const UvodScreen = ({
  projectParticipation,
  onProjectChange,
  selectedFaculty,
  onFacultyChange,
  customFaculty,
  onCustomFacultyChange,
  onlyPanelSelected,
}: UvodScreenProps) => {
  return (
    <section className="c2s-screen">
      <div className={gridTwoClassName}>
        <InputField label="IME I PREZIME *" />
        <InputField label="MEJL ADRESA *" />
      </div>

      <div className={mt4ClassName}>
        <CheckItem
          label="Saglasan/na sam da se moj mejl pošalje kompanijama koje učestvuju na projektu Kompanije studentima 2026 u svrhu obaveštenja o novim pozicijama i ponudama (opciono)"
          checked={false}
        />
      </div>

      <div className={mt4ClassName}>
        <InputField
          label="BROJ TELEFONA *"
          hint="Broj telefona će biti korišćen za formiranje grupa na WhatsApp-u koje će biti korišćene kao oblik komunikacije za slanje informacija vezanih za projekat Kompanije studentima."
        />
      </div>

      <div className={`${gridTwoClassName} ${mt4ClassName}`}>
        <InputField
          label="FAKULTET NA KOM STUDIRAŠ *"
          placeholder="Izaberi fakultet"
          hasChevron
          options={facultyOptions}
          value={selectedFaculty}
          onValueChange={onFacultyChange}
        />
        <InputField
          label="GODINA STUDIJA *"
          placeholder="Izaberi godinu"
          hasChevron
          options={studyYearOptions}
        />
      </div>

      {selectedFaculty === 'Fakultet organizacionih nauka' && (
        <div className={mt4ClassName}>
          <InputField label="BROJ INDEKSA *" placeholder="Unesi broj indeksa" />
        </div>
      )}

      {selectedFaculty === 'Drugi fakultet' && (
        <div className={mt4ClassName}>
          <InputField
            label="NAZIV FAKULTETA *"
            placeholder="Unesi naziv fakulteta"
            value={customFaculty}
            onValueChange={onCustomFacultyChange}
          />
        </div>
      )}

      <div className={`${gridTwoClassName} ${mt5ClassName}`}>
        <div>
          <p className={labelClassName}>DELOVI PROJEKTA NA KOJIMA ŽELIŠ DA UČESTVUJEŠ</p>
          <div className={checkListClassName}>
            <CheckItem
              label="Tech challenge"
              checked={projectParticipation.tech}
              onChange={(value) => onProjectChange('tech', value)}
            />
            <CheckItem
              label="Panel diskusija"
              checked={projectParticipation.panel}
              onChange={(value) => onProjectChange('panel', value)}
            />
            <CheckItem
              label="Speed dating"
              checked={projectParticipation.speed}
              onChange={(value) => onProjectChange('speed', value)}
            />
          </div>
        </div>

        <InputField
          label="UNESI LINK DO CV-JA *"
          hint={
            onlyPanelSelected
              ? 'Za prijavu samo na panel nije neophodno da uneseš link do CV-ja.'
              : 'Omogući da svi imaju pristup drajvu na kom se CV nalazi kako bismo mogli da ga preuzmemo'
          }
        />
      </div>

      {onlyPanelSelected && (
        <p className={`${hintClassName} mt-2 border-none pl-0`}>
          Ove informacije će morati svi da popune bez obzira na šta se prijavljuju, izuzetak je jedino CV deo gde ukoliko se prijavljuju samo za panel neće biti neophodno da se unese link do CV-ja.
        </p>
      )}

      <div className="mt-3">
        <CheckItem
          label="Saglasan/na sam da se moj CV pošalje svim kompanijama koje učestvuju na projektu Kompanije studentima 2026 (opciono)"
          checked={false}
        />
        <CheckItem
          label="Saglasan/na sam da mi pristižu obaveštenja o narednim FONIS-ovim aktivnostima. (NEWSLETTER) (opciono)"
          checked={false}
        />
      </div>
    </section>
  )
}

type ScreenProps = {
  disabled: boolean
}

const TechScreen = ({ disabled }: ScreenProps) => {
  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <h2 className={fieldTitleClassName}>ODABERI KOMPANIJU NA ČIJI BOOTCAMP ŽELIŠ PRIMARNO DA SE PRIJAVIŠ:</h2>
      <InputBar placeholder="Izaberi kompaniju" hasChevron disabled={disabled} />

      <div className={panelStripClassName}>
        <QuestionArea
          label="MOTIVACIONO PITANJE: ŠTA TE JE NAVELO DA SE PRIJAVIŠ BAŠ ZA OVU KOMPANIJU?"
          placeholder=""
          disabled={disabled}
        />

        <div className={mt6ClassName}>
          <QuestionArea
            label="MOTIVACIONO PITANJE: ŠTA OČEKUJEŠ OD OVOG BOOTCAMP-A?"
            placeholder=""
            disabled={disabled}
          />
        </div>
      </div>

      <h3 className={subtitleClassName}>ODABERI DRUGU ALTERNATIVNU KOMPANIJU. (NIJE OBAVEZNO PITANJE)</h3>
      <InputBar placeholder="Izaberi drugu alternativnu kompaniju" hasChevron disabled={disabled} />
      <p className={`${hintClassName} mt-1.5 border-none pl-0`}>
        Kako bi se povećale šanse da prisustvuješ bootcampu izaberi još jednu kompaniju
      </p>
    </section>
  )
}

const PanelScreen = ({ disabled }: ScreenProps) => {
  const [wantsToParticipate, setWantsToParticipate] = useState(false)
  const canWriteQuestion = !disabled && wantsToParticipate

  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <h2 className={fieldTitleClassName}>TEMA OVOGODIŠNJEG PANELA:</h2>
      <p className={panelThemeClassName}>???????</p>

      <div className={mb7ClassName}>
        <CheckItem
          label="Da li želiš da učestvuješ?"
          checked={wantsToParticipate}
          onChange={setWantsToParticipate}
          disabled={disabled}
        />
      </div>

      <QuestionArea
        label="KOJE PITANJE BI POSTAVIO/LA PANELISTIMA?"
        placeholder={canWriteQuestion ? '' : disabled ? 'Ova kategorija je isključena u uvodu' : 'Čekiraj "Želim da učestvujem" da uneseš pitanje'}
        disabled={!canWriteQuestion}
      />
    </section>
  )
}

const SpeedDatingScreen = ({ disabled }: ScreenProps) => {
  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <h2 className={fieldTitleClassName}>IZABERI KOMPANIJE NA ČIJEM SPEED DATING-U BI VOLEO/LA DA UČESTVUJEŠ.</h2>

      <div className="grid gap-2">
        <ChoiceField label="PRVA ŽELJA *" disabled={disabled} />
        <ChoiceField label="DRUGA ŽELJA" disabled={disabled} />
        <ChoiceField label="TREĆA ŽELJA" disabled={disabled} />
        <ChoiceField label="ČETVRTA ŽELJA" disabled={disabled} />
      </div>
    </section>
  )
}

type InputFieldProps = {
  label: string
  defaultValue?: string
  value?: string
  placeholder?: string
  hasChevron?: boolean
  hint?: string
  options?: SelectOption[]
  disabled?: boolean
  onValueChange?: (value: string) => void
}

const InputField = ({
  label,
  defaultValue,
  value,
  placeholder,
  hasChevron,
  hint,
  options,
  disabled,
  onValueChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <InputBar
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        hasChevron={hasChevron}
        options={options}
        disabled={disabled}
        onValueChange={onValueChange}
      />
      {hint && <p className={hintClassName}>{hint}</p>}
    </div>
  )
}

type InputBarProps = {
  defaultValue?: string
  value?: string
  placeholder?: string
  hasChevron?: boolean
  options?: SelectOption[]
  disabled?: boolean
  onValueChange?: (value: string) => void
}

const InputBar = ({
  defaultValue,
  value,
  placeholder,
  hasChevron,
  options,
  disabled,
  onValueChange,
}: InputBarProps) => {
  return (
    <div className="relative">
      {options && options.length > 0 ? (
        <select
          defaultValue={defaultValue ?? ''}
          value={value}
          disabled={disabled}
          className={selectClassName}
          onChange={(event) => onValueChange?.(event.target.value)}
        >
          <option value="" disabled>
            {placeholder ?? 'Izaberi opciju'}
          </option>
          {options.map((option, index) => {
            const normalizedOption =
              typeof option === 'string'
                ? { label: option, value: option, disabled: false }
                : {
                    label: option.label,
                    value: option.value ?? option.label,
                    disabled: option.disabled ?? false,
                  }

            return (
              <option
                key={`${normalizedOption.value}-${index}`}
                value={normalizedOption.value}
                disabled={normalizedOption.disabled}
              >
                {normalizedOption.label}
              </option>
            )
          })}
        </select>
      ) : hasChevron ? (
        <select defaultValue="" disabled={disabled} className={selectClassName}>
          <option value="" disabled>
            {placeholder ?? 'Dodaćemo uskoro'}
          </option>
        </select>
      ) : (
        <input
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={inputBaseClassName}
          onChange={(event) => onValueChange?.(event.target.value)}
        />
      )}
      {hasChevron && (
        <span className={chevronClassName}>
          ↓
        </span>
      )}
    </div>
  )
}

type QuestionAreaProps = {
  label: string
  placeholder?: string
  disabled?: boolean
}

const QuestionArea = ({ label, placeholder, disabled }: QuestionAreaProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        className={textAreaClassName}
      />
    </div>
  )
}

type CheckItemProps = {
  label: string
  checked: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

const CheckItem = ({ label, checked, onChange, disabled }: CheckItemProps) => {
  const compact = label.length > 70

  return (
    <label
      className={`${checkBaseClassName} ${compact ? 'mb-1 text-[clamp(11px,0.35vw+9px,14px)]' : 'mb-1.5 text-(--c2s-form-check-size)'} ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      <input
        type="checkbox"
        checked={onChange ? checked : undefined}
        defaultChecked={onChange ? undefined : checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        className="peer absolute size-px opacity-0"
      />
      <span className={checkBoxClassName} />
      <span className="flex-1">{label}</span>
    </label>
  )
}

type ChoiceFieldProps = {
  label: string
  disabled?: boolean
}

const ChoiceField = ({ label, disabled }: ChoiceFieldProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <InputBar placeholder="..." hasChevron disabled={disabled} />
    </div>
  )
}

export default C2SRegistrationPage

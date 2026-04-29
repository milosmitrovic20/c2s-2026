import { useRef, useState, type CSSProperties, type FormEvent } from 'react'
import logo from '../../assets/logo.svg'
import submitArrow from '../../assets/red-arrow.png'
import submitArrowHover from '../../assets/white-arrow.png'
import { supabase } from '@/lib/supabase'

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

const testCompanyOptions = [
  'Test kompanija Alfa',
  'Test kompanija Beta',
  'Test kompanija Gamma',
  'Test kompanija Delta',
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
  'font-c2s flex min-h-screen w-full justify-center overflow-x-hidden overflow-y-auto bg-[#0D0E0F] px-[14px] py-[12px] text-[#FFFFFF] max-[1270px]:block max-[1270px]:px-3 max-[1270px]:py-3 max-[640px]:px-2 max-[640px]:py-2'
const stageClassName =
  'h-[calc(var(--c2s-design-h)*var(--c2s-scale))] w-[calc(var(--c2s-design-w)*var(--c2s-scale))] overflow-visible max-[1270px]:h-auto max-[1270px]:w-full'
const shellClassName =
  'h-[760px] w-[1240px] origin-top-left max-[1270px]:h-auto max-[1270px]:w-full max-[1270px]:transform-none'
const headerClassName =
  'relative mb-0 flex items-end justify-between gap-4 max-[640px]:gap-2 min-[1500px]:mb-0'
const logoClassName =
  'block h-auto w-[clamp(170px,20vw,250px)] max-w-full ' +
  'max-[1270px]:w-[clamp(120px,35vw,220px)] ' +
  'max-[640px]:w-[clamp(100px,30vw,180px)]'
const submitButtonClassName =
  'group flex items-center justify-center ' +
  'w-fit min-w-[210px] rounded-[16px] border-[3px] border-white bg-[#0b0b0b] mb-2 ' + 
  'px-6 py-2.5 cursor-pointer transition-transform duration-150 hover:scale-[1.02] hover:bg-[#E31E2F] text-white transition-colors ' +
  'max-[1270px]:relative max-[1270px]:w-fit max-[1270px]:ml-auto ' +
  'max-[640px]:min-w-0 max-[640px]:px-5 max-[640px]:py-2 max-[640px]:rounded-[12px] max-[640px]:border-[2px] max-[640px]:mb-2'
const navButtonClassName = 'group w-full cursor-pointer border-0 bg-transparent p-0 text-left max-[1270px]:w-auto max-[1270px]:text-center max-[640px]:mb-0 max-[640px]:px-0'
const navRowClassName = 'flex items-start justify-between gap-2.5 max-[1270px]:items-center max-[1270px]:justify-center max-[1270px]:gap-2 max-[640px]:gap-1'
const navLabelBaseClassName =
  'relative m-0 max-w-none uppercase text-[28px] font-bold leading-[0.96] tracking-[0.1em] text-[#FFFFFF]/95 transition-colors group-hover:text-[#FFFFFF] max-[1270px]:text-[20px] max-[1270px]:tracking-[0.12em] max-[640px]:text-[18px] max-[640px]:tracking-[0.04em] max-[640px]:leading-[0.8]'
const navLabelStackClassName = 'flex flex-col items-start gap-[0.05em] max-[1270px]:items-center max-[640px]:items-center'
const navStrikeTextClassName = 'relative inline-block leading-none'
const navStrikeOverlayClassName =
  'pointer-events-none absolute left-0 top-[0.55em] h-[3px] w-full origin-left bg-[#E31E2F] transition-transform duration-300 ease-out'
const navArrowBaseClassName =
  'mt-1 text-[28px] leading-none transition-[color,transform] group-hover:text-[#E31E2F] group-hover:-translate-y-px group-hover:rotate-[-18deg] max-[1270px]:text-[22px] max-[1270px]:mt-0.5 max-[640px]:text-[14px] max-[640px]:mt-0.5'
const navUnderlineClassName = 'mt-2.5 h-[2px] w-[182px] bg-[#FFFFFF]/85 max-[1270px]:hidden max-[640px]:hidden'
const layoutClassName =
  'grid grid-cols-[250px_minmax(0,1fr)] items-start gap-[26px] max-[1270px]:grid-cols-1 max-[1270px]:gap-4 max-[640px]:gap-2 min-[1500px]:grid-cols-[270px_minmax(0,1fr)] min-[1500px]:gap-[78px]'
const navClassName = 
  'pt-2 max-[1270px]:pt-0 max-[1270px]:flex max-[1270px]:flex-row max-[1270px]:justify-between max-[1270px]:gap-2 max-[640px]:flex max-[640px]:flex-row max-[640px]:justify-between max-[640px]:gap-1'
const contentClassName = 'min-w-0 pt-[2px] min-[1500px]:pt-[6px] text-left'
const gridTwoClassName = 'grid grid-cols-2 gap-2.5 max-[1270px]:grid-cols-2 max-[800px]:grid-cols-1 max-[1270px]:gap-3 max-[640px]:gap-1.5 min-[1500px]:gap-4'
const mt4ClassName = 'mt-2.5'
const mt5ClassName = 'mt-3'
const mt6ClassName = 'mt-3.5'
const labelClassName =
  'mb-[5px] block text-(--c2s-form-label-size) font-bold uppercase tracking-[0.28em] text-[#FFFFFF]'
const inputBaseClassName =
  'transition-all duration-200 h-[clamp(34px,1.15vw+30px,44px)] w-full rounded-full border border-[#C6172F] bg-[#6A0B20] px-2.5 text-(--c2s-form-input-size) leading-none text-[#FFFFFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] placeholder:text-[#FFFFFF]/60 focus:outline focus:outline-2 focus:outline-[#E31E2F] disabled:cursor-not-allowed disabled:border-[#4E0610] disabled:bg-[#4E0610] disabled:text-[#FFFFFF]/45 disabled:placeholder:text-[#FFFFFF]/25 max-[640px]:text-sm max-[640px]:px-2'
const selectClassName = `${inputBaseClassName} appearance-none cursor-pointer pr-[42px]`
const chevronClassName =
  'pointer-events-none absolute right-2.5 top-1/2 grid h-[22px] w-[22px] -translate-y-1/2 place-items-center rounded-full border border-[#FFFFFF]/65 text-[clamp(14px,0.35vw+12px,18px)] leading-none text-[#FFFFFF]/95'
const textAreaClassName =
  'min-h-[clamp(74px,1.9vw+62px,110px)] w-full resize-none rounded-[18px] border border-[#C6172F] bg-[#6A0B20] px-3 py-2.5 text-(--c2s-form-input-size) leading-[1.35] text-[#FFFFFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] placeholder:text-[#FFFFFF]/55 focus:outline focus:outline-2 focus:outline-[#E31E2F] disabled:cursor-not-allowed disabled:border-[#4E0610] disabled:bg-[#4E0610] disabled:text-[#FFFFFF]/45 disabled:placeholder:text-[#FFFFFF]/25 ' +
  'max-[640px]:text-sm max-[640px]:px-2 max-[640px]:py-2 max-[640px]:min-h-[450px]'
const hintClassName =
  'mt-1 border-l border-[#FFFFFF]/45 pl-[7px] text-(--c2s-form-hint-size) text-[#FFFFFF]/40 text-justify'
const panelStripClassName = 'my-2.5 border-l-2 border-[#FFFFFF]/60 pl-3 max-[640px]:my-2 max-[640px]:pl-2.5 min-[1500px]:my-4'
const checkListClassName = 'pt-1'
const checkBaseClassName = 'flex items-start gap-1.5 leading-[1.2]'
const checkBoxClassName =
  'mt-px grid h-[17px] w-[17px] shrink-0 place-items-center rounded-[3px] border border-[#E31E2F] transition-all duration-200 peer-checked:border-[#E31E2F] peer-checked:bg-[#E31E2F]'
const disabledSectionClassName = 'opacity-45'
const hiddenSectionClassName = 'hidden'

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

const Prijave = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [active, setActive] = useState<SectionKey>('uvod')
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [customFaculty, setCustomFaculty] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [projectParticipation, setProjectParticipation] = useState<Record<ProjectKey, boolean>>({
    tech: true,
    panel: true,
    speed: true,
  })

  const clearNamedField = (fieldName: string) => {
    const form = formRef.current
    if (!form) return

    const field = form.elements.namedItem(fieldName)
    if (!field) return

    const clearElement = (element: Element) => {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'checkbox' || element.type === 'radio') {
          element.checked = false
          return
        }
        element.value = ''
        return
      }
      if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
        element.value = ''
      }
    }

    if (field instanceof RadioNodeList) {
      Array.from(field).forEach((node) => {
        if (node instanceof Element) {
          clearElement(node)
        }
      })
      return
    }

    if (field instanceof Element) {
      clearElement(field)
    }
  }

  const clearSectionFields = (key: ProjectKey) => {
    if (key === 'tech') {
      clearNamedField('techPrimaryCompany')
      clearNamedField('techMotivationCompany')
      clearNamedField('techMotivationExpectations')
      clearNamedField('techSecondaryCompany')
      return
    }
    if (key === 'panel') {
      clearNamedField('panelQuestion')
      return
    }
    clearNamedField('speedChoice1')
    clearNamedField('speedChoice2')
    clearNamedField('speedChoice3')
    clearNamedField('speedChoice4')
  }

  const setProjectSelected = (key: ProjectKey, value: boolean) => {
    setProjectParticipation((prev) => ({ ...prev, [key]: value }))
    if (!value) {
      clearSectionFields(key)
    }
  }

  const getFormValue = (formData: FormData, key: string) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value.trim() : ''
  }

  const isGoogleDriveLink = (value: string) => {
    try {
      const parsed = new URL(value)
      return (
        parsed.protocol === 'https:' &&
        (parsed.hostname === 'drive.google.com' || parsed.hostname === 'docs.google.com')
      )
    } catch {
      return false
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^06\d{7,8}$/
    return phoneRegex.test(phone)
  }

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    if (target.name && errors.includes(target.name)) {
      setErrors((prev) => prev.filter((err) => err !== target.name))
      if (submitState === 'error') {
        setSubmitState('idle')
        setSubmitMessage('')
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!supabase) {
      setSubmitState('error')
      setSubmitMessage('Supabase nije podešen. Dodaj VITE_SUPABASE_URL i VITE_SUPABASE_PUBLISHABLE_KEY (ili VITE_SUPABASE_ANON_KEY) u .env ili .env.local fajl.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const newErrors: string[] = []

    const fullName = getFormValue(formData, 'fullName')
    const email = getFormValue(formData, 'email').toLowerCase()
    const phone = getFormValue(formData, 'phone')
    const faculty = getFormValue(formData, 'faculty')
    const studyYear = getFormValue(formData, 'studyYear')
    const cvLink = getFormValue(formData, 'cvLink')
    const indexNumber = getFormValue(formData, 'indexNumber')
    const customFacultyName = getFormValue(formData, 'customFaculty')

    if (!fullName) newErrors.push('fullName')
    
    if (!email) {
      newErrors.push('email')
    } else if (!isValidEmail(email)) {
      newErrors.push('email')
    }

    if (!phone) {
      newErrors.push('phone')
    } else if (!isValidPhone(phone)) {
      newErrors.push('phone')
    }

    if (!faculty) newErrors.push('faculty')
    if (!studyYear) newErrors.push('studyYear')
    
    if (!cvLink) {
      newErrors.push('cvLink')
    } else if (!isGoogleDriveLink(cvLink)) {
      newErrors.push('cvLink')
    }

    if (faculty === 'Fakultet organizacionih nauka' && !indexNumber) newErrors.push('indexNumber')
    if (faculty === 'Drugi fakultet' && !customFacultyName) newErrors.push('customFaculty')

    if (!formData.has('emailConsentCompanies')) newErrors.push('emailConsentCompanies')
    if (!formData.has('cvConsentCompanies')) newErrors.push('cvConsentCompanies')

    if (projectParticipation.tech) {
      if (!getFormValue(formData, 'techPrimaryCompany')) newErrors.push('techPrimaryCompany')
      if (!getFormValue(formData, 'techMotivationCompany')) newErrors.push('techMotivationCompany')
      if (!getFormValue(formData, 'techMotivationExpectations')) newErrors.push('techMotivationExpectations')
    }

    if (projectParticipation.panel && !getFormValue(formData, 'panelQuestion')) {
      newErrors.push('panelQuestion')
    }

    if (projectParticipation.speed && !getFormValue(formData, 'speedChoice1')) {
      newErrors.push('speedChoice1')
    }

    if (!projectParticipation.tech && !projectParticipation.panel && !projectParticipation.speed) {
      setSubmitState('error')
      setSubmitMessage('Moraš da odabereš bar jedan deo projekta.')
      return
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setSubmitState('error')
      
      let errorMsg = 'Molimo te da popuniš sva obavezna polja.'
      
      if (email && !isValidEmail(email)) {
        errorMsg = 'Uneti mejl nije u validnom formatu.'
      } else if (phone && !isValidPhone(phone)) {
        errorMsg = 'Telefon mora početi sa 06 i imati 9 ili 10 cifara.'
      } else if (cvLink && !isGoogleDriveLink(cvLink)) {
        errorMsg = 'CV mora biti validan Google Drive link.'
      }

      setSubmitMessage(errorMsg)
      return
    }

    setErrors([])
    setIsSubmitting(true)
    setSubmitState('idle')
    setSubmitMessage('')

    const payload = {
      ime_prezime: fullName,
      mejl: email,
      broj_telefona: phone,
      fakultet: faculty,
      godina_studija: studyYear,
      broj_indeksa: indexNumber || null,
      naziv_drugog_fakulteta: customFacultyName || null,
      link_cv: cvLink || null,
      ucestvuje_tech: projectParticipation.tech,
      ucestvuje_panel: projectParticipation.panel,
      ucestvuje_speed: projectParticipation.speed,
      saglasnost_mejl: formData.has('emailConsentCompanies'),
      saglasnost_cv: formData.has('cvConsentCompanies'),
      saglasnost_newsletter: formData.has('newsletterConsent'),
      tech_primarna_kompanija: getFormValue(formData, 'techPrimaryCompany') || null,
      tech_motivacija_kompanija: getFormValue(formData, 'techMotivationCompany') || null,
      tech_motivacija_ocekivanja: getFormValue(formData, 'techMotivationExpectations') || null,
      tech_alternativna_kompanija: getFormValue(formData, 'techSecondaryCompany') || null,
      panel_pitanje: getFormValue(formData, 'panelQuestion') || null,
      speed_zelja_1: getFormValue(formData, 'speedChoice1') || null,
      speed_zelja_2: getFormValue(formData, 'speedChoice2') || null,
      speed_zelja_3: getFormValue(formData, 'speedChoice3') || null,
      speed_zelja_4: getFormValue(formData, 'speedChoice4') || null,
    }

    const { error } = await supabase.from('prijave').insert(payload)

    setIsSubmitting(false)

    if (error) {
      setSubmitState('error')
      if (error.code === '23505') {
        const errorText = `${error.message} ${error.details ?? ''}`.toLowerCase()

        if (errorText.includes('email') || errorText.includes('mejl')) {
          setSubmitMessage('Prijava sa ovim mejlom već postoji.')
          return
        }

        if (errorText.includes('phone') || errorText.includes('broj_telefona')) {
          setSubmitMessage('Prijava sa ovim brojem telefona već postoji.')
          return
        }

        setSubmitMessage('Prijava sa istim mejlom ili brojem telefona već postoji.')
        return
      }

      setSubmitMessage('Greška pri slanju prijave. Pokušaj ponovo.')
      return
    }

    setSubmitState('success')
    setSubmitMessage('Prijava je uspešno poslata!')
  }

  return (
    <div className={pageClassName} style={pageStyle}>
      <div className={stageClassName}>
        <form
          ref={formRef}
          className={shellClassName}
          style={{ transform: 'scale(var(--c2s-scale))', transformOrigin: 'top left' }}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        >
          <header className={headerClassName}>
            <div className="shrink-0 flex items-end">
              <img src={logo} alt="Companies to Students" className={logoClassName} />
            </div>

            <div className="flex flex-col items-end justify-end gap-2 w-full max-w-full">
              {submitState !== 'idle' && (
                <p 
                  className={`text-right text-sm font-bold leading-tight max-w-87.5 max-[640px]:max-w-55 max-[640px]:text-xs ${
                    submitState === 'success' ? 'text-[#8DE3B0]' : 'text-[#FF7F8A]'
                  }`}
                >
                  {submitMessage}
                </p>
              )}

              <button
                type="submit"
                className={`${submitButtonClassName} ${isSubmitting ? 'pointer-events-none opacity-75' : ''} transition-all`}
                aria-label="Pošalji prijavu"
                disabled={isSubmitting}
              >
                <div className="flex items-center justify-center gap-3 max-[640px]:gap-2">
                  <div className="flex flex-col items-end leading-[0.7] h-fit">
                    <span className="block text-[38px] font-bold tracking-[0.06em] uppercase max-[640px]:text-[24px]">
                      POŠALJI
                    </span>
                    <span
                      className="block italic text-[#E31E2F] group-hover:text-[#0b0b0b] transition-colors text-[28px] mr-10 mt-[-0.4rem] max-[640px]:mr-4 max-[640px]:mt-[-0.2rem] max-[640px]:text-[18px]"
                      style={{
                        fontFamily: '"Lovely May Script", Pacifico, "Brush Script MT", cursive',
                        lineHeight: '1'
                      }}
                    >
                      prijavu
                    </span>
                  </div>

                  <div className="relative h-8 w-11 shrink-0 flex items-center max-[640px]:w-8 max-[640px]:h-6">
                    <img
                      src={submitArrow}
                      alt="arrow"
                      className="h-full w-full object-contain block transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={submitArrowHover}
                      alt="arrow hover"
                      className="absolute left-0 h-full w-full object-contain block transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </button>
            </div>
          </header>

          <div className="mb-4 h-0.5 bg-[#FFFFFF]/75 min-[1500px]:mb-7.5">
            <div
              className="h-full bg-[#C6172F] transition-[width] duration-200"
              style={{ width: `${progressMap[active]}%` }}
            />
          </div>

          <div className={layoutClassName}>
            <div className="flex flex-col max-[1270px]:block">
              <aside className={navClassName}>
                {navItems.map((item) => {
                  const isActive = item.key === active
                  const disabled = isProjectSectionKey(item.key) && !projectParticipation[item.key]
                  const mobileLabelWords = item.shortLabel.split(' ')

                  return (
                    <button 
                      key={item.key} 
                      type="button" 
                      onClick={() => setActive(item.key)} 
                      className={`${navButtonClassName} mb-12 max-[1270px]:mb-0 max-[1270px]:w-auto`}
                    >
                      <div className={navRowClassName}>
                        <p className={`${navLabelBaseClassName} ${isActive ? 'text-[#FFFFFF]' : ''}`}>
                          <span className={navLabelStackClassName}>
                            <span className="block max-[1270px]:hidden">
                              {item.label.split(' ').map((word, i) => (
                                <span key={i} className={navStrikeTextClassName}>
                                  {word}
                                  <span className={`${navStrikeOverlayClassName} ${disabled ? 'scale-x-100' : 'scale-x-0'}`} />
                                </span>
                              ))}
                            </span>
                            <span className="hidden max-[1270px]:flex flex-col items-center">
                              {mobileLabelWords.map((word, i) => (
                                <span key={i} className={navStrikeTextClassName}>
                                  {word}
                                  <span className={`${navStrikeOverlayClassName} ${disabled ? 'scale-x-100' : 'scale-x-0'}`} />
                                </span>
                              ))}
                            </span>
                          </span>
                        </p>
                        <span className={`${navArrowBaseClassName} ${isActive ? 'text-[#E31E2F] rotate-[-18deg]' : 'text-[#FFFFFF]/90'}`}>→</span>
                      </div>
                      <div className={navUnderlineClassName} />
                    </button>
                  )
                })}
              </aside>
              <div className="hidden max-[1270px]:block h-px w-full bg-[#FFFFFF]/85 mt-4" />
            </div>

            <main className={contentClassName}>
              <div className={active === 'uvod' ? '' : hiddenSectionClassName}>
                <UvodScreen
                  projectParticipation={projectParticipation}
                  onProjectChange={setProjectSelected}
                  selectedFaculty={selectedFaculty}
                  onFacultyChange={setSelectedFaculty}
                  customFaculty={customFaculty}
                  onCustomFacultyChange={setCustomFaculty}
                  errors={errors}
                />
              </div>
              <div className={active === 'tech' ? '' : hiddenSectionClassName}>
                <TechScreen disabled={!projectParticipation.tech} errors={errors} />
              </div>
              <div className={active === 'panel' ? '' : hiddenSectionClassName}>
                <PanelScreen disabled={!projectParticipation.panel} errors={errors} />
              </div>
              <div className={active === 'speed' ? '' : hiddenSectionClassName}>
                <SpeedDatingScreen disabled={!projectParticipation.speed} errors={errors} />
              </div>
            </main>
          </div>
        </form>
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
  errors: string[]
}

const UvodScreen = ({
  projectParticipation,
  onProjectChange,
  selectedFaculty,
  onFacultyChange,
  customFaculty,
  onCustomFacultyChange,
  errors,
}: UvodScreenProps) => {
  return (
    <section className="c2s-screen">
      <div className={gridTwoClassName}>
        <InputField label="IME I PREZIME *" name="fullName" hasError={errors.includes('fullName')} />
        <InputField
          label="BROJ TELEFONA *"
          name="phone"
          hasError={errors.includes('phone')}
          placeholder="06XXXXXXXX"
          hint="Korišćeno za WhatsApp grupu projekta"
          hintTextClassName="text-[16px] leading-[1.25] max-[640px]:text-[14px]"
        />      
        </div>

      <div className={mt4ClassName}>
        <InputField label="MEJL ADRESA *" name="email" placeholder="primer@mejl.com" hasError={errors.includes('email')} />
      </div>

      <div className={`${gridTwoClassName} ${mt4ClassName}`}>
        <InputField
          label="FAKULTET NA KOM STUDIRAŠ *"
          name="faculty"
          placeholder="Izaberi fakultet"
          hasChevron
          options={facultyOptions}
          value={selectedFaculty}
          onValueChange={onFacultyChange}
          hasError={errors.includes('faculty')}
        />
        <InputField
          label="GODINA STUDIJA *"
          name="studyYear"
          placeholder="Unesi godinu studija"
          hasError={errors.includes('studyYear')}
        />
      </div>

      {selectedFaculty === 'Fakultet organizacionih nauka' && (
        <div className={mt4ClassName}>
          <InputField label="BROJ INDEKSA *" name="indexNumber" placeholder="Unesi broj indeksa" hasError={errors.includes('indexNumber')} />
        </div>
      )}

      {selectedFaculty === 'Drugi fakultet' && (
        <div className={mt4ClassName}>
          <InputField
            label="NAZIV FAKULTETA *"
            name="customFaculty"
            placeholder="Unesi naziv fakulteta"
            value={customFaculty}
            onValueChange={onCustomFacultyChange}
            hasError={errors.includes('customFaculty')}
          />
        </div>
      )}

      <div className={`${gridTwoClassName} ${mt5ClassName}`}>
        <div>
          <p className={labelClassName}>DELOVI PROJEKTA NA KOJIMA ŽELIŠ DA UČESTVUJEŠ</p>
          <div className={checkListClassName}>
            <CheckItem
              label="Tech challenge"
              className="mb-1.5"
              checked={projectParticipation.tech}
              onChange={(value) => onProjectChange('tech', value)}
            />
            <CheckItem
              label="Panel diskusija"
              className="mb-1.5"
              checked={projectParticipation.panel}
              onChange={(value) => onProjectChange('panel', value)}
            />
            <CheckItem
              label="Speed dating"
              className="mb-1.5"
              checked={projectParticipation.speed}
              onChange={(value) => onProjectChange('speed', value)}
            />
          </div>
        </div>

        <InputField
          label="UNESI LINK DO CV-JA *"
          name="cvLink"
          hasError={errors.includes('cvLink')}
          hint="CV je obavezan. Unesi Google Drive link (drive.google.com ili docs.google.com) sa uključenim pristupom."
          hintTextClassName="text-[16px] leading-[1.25] max-[640px]:text-[14px]"
        />
      </div>

      <div className="mt-3">
        <CheckItem
          label="Saglasan/na sam da se moj mejl pošalje kompanijama koje učestvuju na projektu Kompanije studentima 2026 u svrhu obaveštenja o novim pozicijama i ponudama *"
          className="mb-4"
          checked={false}
          name="emailConsentCompanies"
          hasError={errors.includes('emailConsentCompanies')}
        />
        <CheckItem
          label="Saglasan/na sam da se moj CV pošalje svim kompanijama koje učestvuju na projektu Kompanije studentima 2026 *"
          className="mb-4"
          checked={false}
          name="cvConsentCompanies"
          hasError={errors.includes('cvConsentCompanies')}
        />
        <CheckItem
          label="Saglasan/na sam da mi pristižu obaveštenja o narednim FONIS-ovim aktivnostima. (NEWSLETTER)"
          className="mb-4"
          checked={false}
          name="newsletterConsent"
        />
      </div>
    </section>
  )
}

type ScreenProps = {
  disabled: boolean
  errors: string[]
}

const TechScreen = ({ disabled, errors }: ScreenProps) => {
  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <div className="mb-2">
        <p className={labelClassName}>
          {renderLabelText('ODABERI KOMPANIJU NA ČIJI BOOTCAMP ŽELIŠ PRIMARNO DA SE PRIJAVIŠ: *')}
        </p>
        <InputBar
          name="techPrimaryCompany"
          placeholder="Izaberi kompaniju"
          hasChevron
          options={testCompanyOptions}
          disabled={disabled}
          hasError={errors.includes('techPrimaryCompany')}
        />
      </div>

      <div className={panelStripClassName}>
        <QuestionArea
          label="ŠTA TE JE NAVELO DA SE PRIJAVIŠ BAŠ ZA OVU KOMPANIJU? *"
          name="techMotivationCompany"
          placeholder=""
          disabled={disabled}
          hasError={errors.includes('techMotivationCompany')}
        />

        <div className={mt6ClassName}>
          <QuestionArea
            label="ŠTA OČEKUJEŠ OD OVOG BOOTCAMP-A? *"
            name="techMotivationExpectations"
            placeholder=""
            disabled={disabled}
            hasError={errors.includes('techMotivationExpectations')}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className={labelClassName}>
          {renderLabelText('ODABERI DRUGU ALTERNATIVNU KOMPANIJU. (NIJE OBAVEZNO PITANJE)')}
        </p>
        <InputBar
          name="techSecondaryCompany"
          placeholder="Izaberi drugu alternativnu kompaniju"
          hasChevron
          options={testCompanyOptions}
          disabled={disabled}
        />
        <p className={`${hintClassName} mt-1.5 border-none pl-0`}>
          Kako bi se povećale šanse da prisustvuješ bootcampu izaberi još jednu kompaniju
        </p>
      </div>
    </section>
  )
}

type PanelScreenProps = ScreenProps

const PanelScreen = ({ disabled, errors }: PanelScreenProps) => {
  const canWriteQuestion = !disabled

  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <div className="mb-4">
        <p className={labelClassName}>TEMA OVOGODIŠNJEG PANELA:</p>
        <p className={labelClassName}>???????</p>
      </div>

      <QuestionArea
        label="KOJE PITANJE BI POSTAVIO/LA PANELISTIMA? *"
        name="panelQuestion"
        placeholder={canWriteQuestion ? '' : disabled ? 'Ova kategorija je isključena u uvodu' : 'Čekiraj "Želim da učestvujem" da uneseš pitanje'}
        disabled={!canWriteQuestion}
        hasError={errors.includes('panelQuestion')}
      />
    </section>
  )
}

const SpeedDatingScreen = ({ disabled, errors }: ScreenProps) => {
  return (
    <section className={`c2s-screen ${disabled ? disabledSectionClassName : ''}`}>
      <p className={`${labelClassName} mb-4`}>
        IZABERI KOMPANIJE NA ČIJEM SPEED DATING-U BI VOLEO/LA DA UČESTVUJEŠ.
      </p>

      <div className="grid gap-2">
        <ChoiceField label="PRVA ŽELJA *" name="speedChoice1" disabled={disabled} hasError={errors.includes('speedChoice1')} />
        <ChoiceField label="DRUGA ŽELJA" name="speedChoice2" disabled={disabled} />
        <ChoiceField label="TREĆA ŽELJA" name="speedChoice3" disabled={disabled} />
        <ChoiceField label="ČETVRTA ŽELJA" name="speedChoice4" disabled={disabled} />
      </div>
    </section>
  )
}

type InputFieldProps = {
  label: string
  name?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  hasChevron?: boolean
  hint?: string
  hintTextClassName?: string
  options?: SelectOption[]
  disabled?: boolean
  hasError?: boolean
  onValueChange?: (value: string) => void
}

const InputField = ({
  label,
  name,
  defaultValue,
  value,
  placeholder,
  hasChevron,
  hint,
  hintTextClassName,
  options,
  disabled,
  hasError,
  onValueChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <InputBar
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        hasChevron={hasChevron}
        options={options}
        disabled={disabled}
        hasError={hasError}
        onValueChange={onValueChange}
      />
      {hint && <p className={`${hintClassName} ${hintTextClassName ?? ''}`.trim()}>{hint}</p>}
    </div>
  )
}

type InputBarProps = {
  name?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  hasChevron?: boolean
  options?: SelectOption[]
  disabled?: boolean
  hasError?: boolean
  onValueChange?: (value: string) => void
}

const InputBar = ({
  name,
  defaultValue,
  value,
  placeholder,
  hasChevron,
  options,
  disabled,
  hasError,
  onValueChange,
}: InputBarProps) => {
  const errorStyles = hasError ? '!border-[#FF7F8A] !outline !outline-2 !outline-[#FF7F8A]' : ''

  return (
    <div className="relative">
      {options && options.length > 0 ? (
        <select
          name={name}
          {...(value !== undefined ? { value } : { defaultValue: defaultValue ?? '' })}
          disabled={disabled}
          className={`${selectClassName} ${errorStyles}`}
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
        <select name={name} defaultValue="" disabled={disabled} className={`${selectClassName} ${errorStyles}`}>
          <option value="" disabled>
            {placeholder ?? 'Dodaćemo uskoro'}
          </option>
        </select>
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`${inputBaseClassName} ${errorStyles}`}
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
  name?: string
  placeholder?: string
  disabled?: boolean
  hasError?: boolean
}

const QuestionArea = ({ label, name, placeholder, disabled, hasError }: QuestionAreaProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`${textAreaClassName} ${hasError ? 'border-[#FF7F8A]! outline! outline-[#FF7F8A]!' : ''}`}
      />
    </div>
  )
}

type CheckItemProps = {
  label: string
  checked: boolean
  name?: string
  onChange?: (value: boolean) => void
  disabled?: boolean
  hasError?: boolean
  className?: string // Dodajemo ovo
}

const CheckItem = ({ label, checked, name, onChange, disabled, hasError, className }: CheckItemProps) => {
  return (
    <label
      className={`${checkBaseClassName} ${className || ''} text-[16px]! max-[640px]:text-[15px]! ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      <input
        type="checkbox"
        name={name}
        checked={onChange ? checked : undefined}
        defaultChecked={onChange ? undefined : checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        className="peer absolute size-px opacity-0"
      />
      <span className={`${checkBoxClassName} ${hasError ? 'border-[#FF7F8A]! bg-[#FF7F8A]/20! outline! outline-[#FF7F8A]! outline-offset-1!' : ''}`} />
      <span className="flex-1 text-left">{renderLabelText(label)}</span>
    </label>
  )
}

type ChoiceFieldProps = {
  label: string
  name: string
  disabled?: boolean
  hasError?: boolean
}

const ChoiceField = ({ label, name, disabled, hasError }: ChoiceFieldProps) => {
  return (
    <div>
      <label className={labelClassName}>{renderLabelText(label)}</label>
      <InputBar name={name} placeholder="Izaberi opciju" hasChevron options={testCompanyOptions} disabled={disabled} hasError={hasError} />
    </div>
  )
}

export default Prijave
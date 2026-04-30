import { useState } from "react";

// ─── Brand Colors ───────────────────────────────────────────
const C = {
  bg: "#ffffff", bgSoft: "#f7f7f8", bgMid: "#eeeeee",
  heading: "#A10019", teal: "#00A0A6", tealLight: "#e6f7f8", tealMid: "#b3e6e8",
  black: "#111111", gray: "#555555", grayLight: "#999999",
  grayBorder: "#d8d8d8", grayBg: "#f2f2f2", white: "#ffffff",
  gold: "#C97D00", goldLight: "#fff8e6", goldBorder: "#f5d870",
};

// ─── Assessment Data ─────────────────────────────────────────
const assessmentQuestions = [
  { id:"ps1", category:"Problem Solving", icon:"◈",
    text:"When faced with a complex problem, my first instinct is to:",
    options:[
      {text:"Research everything I can find before acting",      scores:{researcher:3,builder:0,organizer:1,connector:0,negotiator:0,taskmaster:0,resource:1}},
      {text:"Break it into smaller tasks and start building",    scores:{researcher:0,builder:3,organizer:1,connector:0,negotiator:0,taskmaster:2,resource:0}},
      {text:"Map out a structured plan first",                   scores:{researcher:1,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:2,resource:1}},
      {text:"Talk to people who've dealt with it before",        scores:{researcher:1,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"ps2", category:"Problem Solving", icon:"◈",
    text:"When a project hits an unexpected roadblock, I:",
    options:[
      {text:"Dig into data and find the root cause",             scores:{researcher:3,builder:0,organizer:1,connector:0,negotiator:0,taskmaster:1,resource:1}},
      {text:"Pivot and find a workaround quickly",               scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:1,taskmaster:1,resource:0}},
      {text:"Reassign resources and adjust the timeline",        scores:{researcher:0,builder:0,organizer:2,connector:0,negotiator:0,taskmaster:2,resource:3}},
      {text:"Bring stakeholders together to co-solve",           scores:{researcher:0,builder:0,organizer:1,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"ch1", category:"Character", icon:"◆",
    text:"People who know me well would say I'm most defined by:",
    options:[
      {text:"My curiosity and love of learning",                 scores:{researcher:3,builder:1,organizer:0,connector:0,negotiator:0,taskmaster:0,resource:0}},
      {text:"My drive to create and make things happen",         scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:0,taskmaster:2,resource:0}},
      {text:"My reliability and follow-through",                 scores:{researcher:0,builder:0,organizer:2,connector:0,negotiator:0,taskmaster:3,resource:2}},
      {text:"My warmth and ability to bring people together",    scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"ch2", category:"Character", icon:"◆",
    text:"Under pressure, my dominant response is to:",
    options:[
      {text:"Get quiet and analyze the situation",               scores:{researcher:3,builder:0,organizer:1,connector:0,negotiator:0,taskmaster:1,resource:1}},
      {text:"Take action — movement creates clarity",            scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:0,taskmaster:2,resource:0}},
      {text:"Stabilize, create order from the chaos",            scores:{researcher:1,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:2,resource:2}},
      {text:"Rally the team and lift morale",                    scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"ei1", category:"Emotional Intelligence", icon:"○",
    text:"When a colleague is visibly upset, I typically:",
    options:[
      {text:"Give them space and research solutions privately",   scores:{researcher:2,builder:0,organizer:0,connector:1,negotiator:0,taskmaster:0,resource:1}},
      {text:"Offer to fix the problem causing the upset",        scores:{researcher:0,builder:3,organizer:1,connector:0,negotiator:0,taskmaster:2,resource:0}},
      {text:"Listen first, then help them make a plan",          scores:{researcher:0,builder:0,organizer:2,connector:2,negotiator:1,taskmaster:1,resource:0}},
      {text:"Sit with them and make sure they feel heard",       scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"ei2", category:"Emotional Intelligence", icon:"○",
    text:"My relationship with conflict is best described as:",
    options:[
      {text:"I observe from a distance and process internally",  scores:{researcher:3,builder:0,organizer:1,connector:0,negotiator:0,taskmaster:0,resource:1}},
      {text:"I address it directly and move forward fast",       scores:{researcher:0,builder:2,organizer:1,connector:0,negotiator:1,taskmaster:3,resource:0}},
      {text:"I mediate and find middle ground",                  scores:{researcher:0,builder:0,organizer:1,connector:2,negotiator:3,taskmaster:0,resource:0}},
      {text:"I nurture the relationship through it",             scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:1}},
    ]},
  { id:"cs1", category:"Communication Style", icon:"▷",
    text:"When presenting to a group, I naturally:",
    options:[
      {text:"Lead with data, evidence, and thoroughness",        scores:{researcher:3,builder:0,organizer:1,connector:0,negotiator:1,taskmaster:0,resource:1}},
      {text:"Show prototypes, demos, or tangible examples",      scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:0,taskmaster:1,resource:0}},
      {text:"Use clear structure: agenda, points, action items", scores:{researcher:1,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:2,resource:1}},
      {text:"Tell stories that create emotional connection",     scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:3,taskmaster:0,resource:0}},
    ]},
  { id:"ws1", category:"Working Style", icon:"▣",
    text:"My ideal work environment is:",
    options:[
      {text:"Quiet, with deep focus time and access to resources",scores:{researcher:3,builder:2,organizer:1,connector:0,negotiator:0,taskmaster:0,resource:1}},
      {text:"Fast-paced, where I can experiment and iterate",    scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:0,taskmaster:2,resource:0}},
      {text:"Structured with clear goals and timelines",         scores:{researcher:1,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:3,resource:2}},
      {text:"Collaborative, with lots of human interaction",     scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"lq1", category:"Leadership Qualities", icon:"◇",
    text:"My leadership style is best described as:",
    options:[
      {text:"Expert — I lead by knowing more than anyone",       scores:{researcher:3,builder:1,organizer:1,connector:0,negotiator:0,taskmaster:0,resource:1}},
      {text:"Visionary — I lead by inspiring with possibilities",scores:{researcher:0,builder:3,organizer:0,connector:1,negotiator:0,taskmaster:0,resource:0}},
      {text:"Operational — I lead by creating clarity and order",scores:{researcher:0,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:3,resource:2}},
      {text:"Relational — I lead by investing in people",        scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
  { id:"pa1", category:"Passion", icon:"◉",
    text:"In my free time, I'm most drawn to:",
    options:[
      {text:"Deep research or learning a new subject",           scores:{researcher:3,builder:1,organizer:0,connector:0,negotiator:0,taskmaster:0,resource:1}},
      {text:"Building or creating something tangible",           scores:{researcher:0,builder:3,organizer:0,connector:0,negotiator:0,taskmaster:1,resource:0}},
      {text:"Designing systems or improving processes",          scores:{researcher:1,builder:0,organizer:3,connector:0,negotiator:0,taskmaster:2,resource:2}},
      {text:"Connecting people or community building",           scores:{researcher:0,builder:0,organizer:0,connector:3,negotiator:2,taskmaster:0,resource:0}},
    ]},
];

const roles = [
  {key:"researcher", label:"Researcher",      symbol:"R", colorKey:"heading", desc:"Discovers truth through investigation and analysis"},
  {key:"builder",    label:"Builder",          symbol:"B", colorKey:"black",   desc:"Creates tangible solutions and drives execution"},
  {key:"organizer",  label:"Organizer",        symbol:"O", colorKey:"teal",    desc:"Structures systems and coordinates moving parts"},
  {key:"connector",  label:"Connector",        symbol:"C", colorKey:"gray",    desc:"Builds relationships and networks people together"},
  {key:"negotiator", label:"Negotiator",       symbol:"N", colorKey:"heading", desc:"Mediates, persuades, and finds mutual ground"},
  {key:"taskmaster", label:"Task Master",      symbol:"T", colorKey:"teal",    desc:"Drives accountability and executes with precision"},
  {key:"resource",   label:"Resource Manager", symbol:"M", colorKey:"black",   desc:"Allocates assets wisely and maximizes capacity"},
];

const MAX_SCORE = 30;

function getRoleColor(ck) {
  return ck==="heading"?C.heading:ck==="teal"?C.teal:ck==="gray"?C.gray:C.black;
}

function ProgressBar({value, max, barColor}) {
  const pct = Math.round((value/max)*100);
  return (
    <div style={{background:C.bgMid,borderRadius:4,height:8,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct}%`,background:barColor,borderRadius:4,transition:"width 0.7s cubic-bezier(0.34,1.56,0.64,1)"}}/>
    </div>
  );
}

function Divider({color}) {
  return <div style={{height:1,background:color||C.grayBorder,margin:"20px 0"}}/>;
}

// ─── Passion Compass Activity ─────────────────────────────────
const passionCategories = [
  {id:"doing",   label:"Things I Love DOING",    icon:"◉", prompt:"What activities make you lose track of time?",        placeholder:"e.g. teaching others, solving puzzles, building things, creating art, organizing events..."},
  {id:"caring",  label:"What I Deeply CARE About",icon:"◆", prompt:"What problems in the world keep you up at night?",    placeholder:"e.g. education gaps, food security, community health, financial inclusion..."},
  {id:"good",    label:"What I'm GOOD At",        icon:"▣", prompt:"What do people always ask you for help with?",        placeholder:"e.g. cooking, listening, organizing, explaining things, selling, designing..."},
  {id:"impact",  label:"The IMPACT I Want to Make",icon:"◇",prompt:"What do you want people to say you changed?",        placeholder:"e.g. I want my community to have better opportunities, I want to provide for my family..."},
];

// ─── Values Sort Activity ─────────────────────────────────────
const allValues = [
  "Honesty","Creativity","Community","Independence","Security","Excellence",
  "Adventure","Service","Integrity","Growth","Family","Justice","Wealth",
  "Health","Spirituality","Loyalty","Innovation","Respect","Kindness","Leadership",
];

// ─── Identity Wheel ───────────────────────────────────────────
const wheelSegments = [
  {id:"roots",   label:"My Roots",        icon:"◈", prompt:"Where do I come from? What heritage or family story shaped me?"},
  {id:"values",  label:"My Values",       icon:"◆", prompt:"What do I believe in most deeply? What would I never compromise?"},
  {id:"talents", label:"My Talents",      icon:"▣", prompt:"What comes naturally to me? What do I do with ease?"},
  {id:"culture", label:"My Culture",      icon:"◉", prompt:"What cultural practices, beliefs, or traditions are part of who I am?"},
  {id:"purpose", label:"My Purpose",      icon:"◇", prompt:"Why do I exist? What am I here to contribute?"},
  {id:"people",  label:"My People",       icon:"○", prompt:"Who shaped me? Who do I show up for?"},
];

// ─── Who Am I Tool ────────────────────────────────────────────
const WA_DIMS = ["Mentally","Emotionally","Spiritually","Physically"];
const WA_ROWS = ["Capabilities","Strengths","Weaknesses","Triggers","Balance","Expression","Performance"];
const WA_ROW_META = {
  Capabilities: {color:"#00A0A6", icon:"◈"},
  Strengths:    {color:"#059669", icon:"◆"},
  Weaknesses:   {color:"#A10019", icon:"◉"},
  Triggers:     {color:"#c2640a", icon:"▲"},
  Balance:      {color:"#6d28d9", icon:"⊖"},
  Expression:   {color:"#005160", icon:"✦"},
  Performance:  {color:"#592D00", icon:"▮"},
};
const WA_DIM_META = {
  Mentally:    {color:"#1e3a5f"},
  Emotionally: {color:"#7c2d8e"},
  Spiritually: {color:"#b45309"},
  Physically:  {color:"#065f46"},
};
const WA_PLACEHOLDERS = {
  Capabilities: {Mentally:"Cognitive skills, learning style…",Emotionally:"EQ, empathy, attunement…",Spiritually:"Intuition, inner wisdom…",Physically:"Physical skills, motor abilities…"},
  Strengths:    {Mentally:"Mental strengths, analytical…",Emotionally:"Emotional resilience, warmth…",Spiritually:"Faith, purpose, groundedness…",Physically:"Energy, endurance, physicality…"},
  Weaknesses:   {Mentally:"Blind spots, overthinking…",Emotionally:"Emotional triggers, reactivity…",Spiritually:"Doubt, disconnection…",Physically:"Physical limits, fatigue…"},
  Triggers:     {Mentally:"What disrupts your focus?",Emotionally:"What destabilizes you?",Spiritually:"What shakes your beliefs?",Physically:"What drains your body?"},
  Balance:      {Mentally:"How do you restore mental balance?",Emotionally:"How do you regulate emotions?",Spiritually:"How do you reconnect spiritually?",Physically:"How do you recover physically?"},
  Expression:   {Mentally:"How do you express your thinking?",Emotionally:"How do you express feelings?",Spiritually:"How do you express your values?",Physically:"How do you express through action?"},
  Performance:  {Mentally:"When do you perform at your best mentally?",Emotionally:"When are you emotionally at your peak?",Spiritually:"When are you most aligned?",Physically:"When do you perform best physically?"},
};

function WhoAmITool() {
  const initData = () => {
    const d = {};
    WA_ROWS.forEach(r => { d[r] = {}; WA_DIMS.forEach(dim => { d[r][dim] = ""; }); });
    return d;
  };
  const [waName, setWaName] = useState("");
  const [waData, setWaData] = useState(initData);
  const [waSaved, setWaSaved] = useState(false);

  const filled = WA_ROWS.reduce((a,r) => a + WA_DIMS.filter(d => waData[r][d].trim()).length, 0);
  const total  = WA_ROWS.length * WA_DIMS.length;
  const pct    = Math.round((filled / total) * 100);

  function updateCell(row, dim, val) {
    setWaData(prev => ({...prev, [row]: {...prev[row], [dim]: val}}));
  }

  return (
    <div>
      {/* Name + progress */}
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:18,flexWrap:"wrap"}}>
        <input value={waName} onChange={e=>setWaName(e.target.value)} placeholder="Your name…"
          style={{padding:"9px 14px",border:`1.5px solid ${waName?C.teal:C.grayBorder}`,borderRadius:7,fontSize:"0.88rem",outline:"none",fontFamily:"Georgia,serif",background:C.white,color:C.black,minWidth:180,transition:"border-color 0.2s"}}/>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
          <div style={{flex:1,background:C.bgMid,borderRadius:4,height:8,overflow:"hidden",minWidth:80}}>
            <div style={{height:"100%",width:`${pct}%`,background:C.teal,borderRadius:4,transition:"width 0.4s ease"}}/>
          </div>
          <span style={{fontSize:"0.76rem",fontFamily:"sans-serif",fontWeight:700,color:C.teal,whiteSpace:"nowrap"}}>{pct}% · {filled}/{total}</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:580}}>
          <thead>
            <tr>
              <th style={{padding:"10px 14px",background:C.black,color:"#fff",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"sans-serif",textAlign:"left",width:110,borderRight:`1px solid ${C.grayBorder}`}}>Dimension</th>
              {WA_DIMS.map(dim => (
                <th key={dim} style={{padding:"10px 10px",background:WA_DIM_META[dim].color,color:"#fff",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"sans-serif",textAlign:"left",border:`1px solid rgba(255,255,255,0.2)`}}>
                  {dim}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WA_ROWS.map((row, ri) => {
              const meta = WA_ROW_META[row];
              return (
                <tr key={row} style={{background:ri%2===0?C.white:C.bgSoft}}>
                  <td style={{padding:"10px 12px",borderRight:`1px solid ${C.grayBorder}`,borderBottom:`1px solid ${C.grayBorder}`,verticalAlign:"top"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{color:meta.color,fontSize:"0.78rem"}}>{meta.icon}</span>
                      <span style={{fontWeight:700,color:meta.color,fontSize:"0.76rem",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.06em"}}>{row}</span>
                    </div>
                  </td>
                  {WA_DIMS.map(dim => (
                    <td key={dim} style={{padding:"6px 8px",border:`1px solid ${C.grayBorder}`,verticalAlign:"top"}}>
                      <textarea
                        value={waData[row][dim]}
                        onChange={e => updateCell(row, dim, e.target.value)}
                        placeholder={WA_PLACEHOLDERS[row]?.[dim] || ""}
                        rows={3}
                        style={{width:"100%",padding:"7px 9px",border:`1.5px solid ${waData[row][dim].trim()?meta.color+"99":C.grayBorder}`,borderRadius:6,fontSize:"0.76rem",outline:"none",resize:"vertical",fontFamily:"sans-serif",background:C.white,color:C.black,lineHeight:1.5,boxSizing:"border-box",transition:"border-color 0.2s"}}
                        onFocus={e=>{e.target.style.borderColor=meta.color;e.target.style.boxShadow=`0 0 0 2px ${meta.color}22`;}}
                        onBlur={e=>{e.target.style.borderColor=waData[row][dim].trim()?meta.color+"99":C.grayBorder;e.target.style.boxShadow="none";}}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Save */}
      <div style={{marginTop:16,display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button onClick={()=>setWaSaved(true)} style={{padding:"11px 24px",borderRadius:7,background:C.teal,border:"none",color:"#fff",fontSize:"0.82rem",fontWeight:700,cursor:"pointer",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em"}}>
          {waSaved?"✓ Saved":"Save My Assessment"}
        </button>
      </div>

      {/* Teal insight box */}
      <div style={{marginTop:14,background:C.tealLight,borderRadius:9,padding:"13px 16px",border:`1px solid ${C.tealMid}`}}>
        <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",color:C.teal,fontFamily:"sans-serif",fontWeight:700,marginBottom:5}}>Why This Matters</div>
        <p style={{margin:0,fontSize:"0.8rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
          This 7×4 map is the most complete snapshot of who you are right now. Your Capabilities and Strengths show you where to build from. Your Weaknesses and Triggers show you what to prepare for. Return to this assessment as you progress — your answers will change, and that change is growth.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [assessStep, setAssessStep] = useState("intro"); // intro|quiz|results
  const [assessCurrent, setAssessCurrent] = useState(0);
  const [assessAnswers, setAssessAnswers] = useState({});
  const [assessSelected, setAssessSelected] = useState(null);
  const [assessScores, setAssessScores] = useState({researcher:0,builder:0,organizer:0,connector:0,negotiator:0,taskmaster:0,resource:0});
  const [assessName, setAssessName] = useState("");
  const [fading, setFading] = useState(false);

  // Activity 2 - Passion Compass
  const [passionAnswers, setPassionAnswers] = useState({doing:"",caring:"",good:"",impact:""});
  const [passionSaved, setPassionSaved] = useState(false);

  // Activity 3 - Values Sort
  const [selectedValues, setSelectedValues] = useState([]);
  const [valuesSaved, setValuesSaved] = useState(false);

  // Activity 4 - Identity Wheel
  const [wheelAnswers, setWheelAnswers] = useState({roots:"",values:"",talents:"",culture:"",purpose:"",people:""});
  const [wheelSaved, setWheelSaved] = useState(false);

  // Activity 5 - Origin Story
  const [storyPrompt, setStoryPrompt] = useState(null);
  const [storyText, setStoryText] = useState({});
  const storyPrompts = [
    {id:"sp1", text:"Describe a moment when you knew exactly who you were. What were you doing, and who were you with?"},
    {id:"sp2", text:"What is a challenge you've overcome that taught you something essential about yourself?"},
    {id:"sp3", text:"Who is someone who believed in you before you believed in yourself? How did that shape you?"},
    {id:"sp4", text:"If your business could solve one problem for people who look like you or come from where you come from, what would it be?"},
  ];

  const sections = [
    {id:"overview",    label:"Overview",            icon:"◈"},
    {id:"lesson",      label:"Lesson Content",      icon:"◆"},
    {id:"expression",  label:"Personal Expression", icon:"▷"},
    {id:"assessment",  label:"A1 · Role Assessment",icon:"▣"},
    {id:"compass",     label:"A2 · Passion Compass", icon:"◉"},
    {id:"values",      label:"A3 · Values Sort",    icon:"◇"},
    {id:"wheel",       label:"A4 · Identity Wheel", icon:"○"},
    {id:"story",       label:"A5 · Origin Story",   icon:"▷"},
    {id:"whoami",      label:"A6 · Who Am I?",      icon:"◆"},
  ];

  const q = assessmentQuestions[assessCurrent];
  const sortedRoles = [...roles].sort((a,b)=>assessScores[b.key]-assessScores[a.key]);
  const topRole = sortedRoles[0];

  function handleAssessNext() {
    if (!assessSelected) return;
    const ns = {...assessScores};
    Object.entries(assessSelected.scores).forEach(([k,v])=>{ns[k]+=v;});
    setAssessScores(ns);
    setAssessAnswers({...assessAnswers,[q.id]:assessSelected});
    setAssessSelected(null);
    setFading(true);
    setTimeout(()=>{
      if(assessCurrent+1<assessmentQuestions.length) setAssessCurrent(assessCurrent+1);
      else setAssessStep("results");
      setFading(false);
    },260);
  }

  function toggleValue(v) {
    if(selectedValues.includes(v)) setSelectedValues(selectedValues.filter(x=>x!==v));
    else if(selectedValues.length<5) setSelectedValues([...selectedValues,v]);
  }

  const card = {background:C.white,border:`1px solid ${C.grayBorder}`,borderRadius:14,padding:"28px 32px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",marginBottom:16};
  const sectionTitle = (t,sub) => (
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <div style={{width:4,height:26,background:C.heading,borderRadius:2}}/>
        <h2 style={{margin:0,fontSize:"1.15rem",fontWeight:700,color:C.heading,fontFamily:"Georgia,serif"}}>{t}</h2>
      </div>
      {sub && <p style={{margin:"0 0 0 14px",fontSize:"0.82rem",color:C.gray,fontFamily:"sans-serif",lineHeight:1.6}}>{sub}</p>}
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:C.bgSoft,fontFamily:"Georgia,'Times New Roman',serif",color:C.black}}>
      
      {/* ── TOP HEADER ── */}
      <div style={{background:C.heading,padding:"0"}}>
        <div style={{maxWidth:980,margin:"0 auto",padding:"22px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.55)",marginBottom:4,fontFamily:"sans-serif"}}>
              Microbiz Startup Journey
            </div>
            <h1 style={{margin:0,fontSize:"1.5rem",fontWeight:700,color:"#fff",fontFamily:"Georgia,serif"}}>
              Module 1 · Lesson 1.1
            </h1>
            <div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.75)",marginTop:3,fontFamily:"sans-serif"}}>
              Personal Identity · Personal Expression
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"0.62rem",textTransform:"uppercase",letterSpacing:"0.12em",color:"rgba(255,255,255,0.5)",fontFamily:"sans-serif"}}>Tokens Available</div>
              <div style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",fontFamily:"sans-serif",lineHeight:1}}>50</div>
            </div>
            <div style={{width:1,height:36,background:"rgba(255,255,255,0.25)"}}/>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect x="1.5" y="1.5" width="41" height="41" rx="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              <rect x="9" y="9" width="10" height="10" fill="rgba(255,255,255,0.18)"/>
              <rect x="25" y="9" width="10" height="10" fill="rgba(255,255,255,0.6)"/>
              <rect x="9" y="25" width="10" height="10" fill="rgba(255,255,255,0.6)"/>
              <rect x="25" y="25" width="10" height="10" fill="rgba(255,255,255,0.18)"/>
            </svg>
          </div>
        </div>

        {/* Nav */}
        <div style={{maxWidth:980,margin:"0 auto",padding:"0 24px",display:"flex",gap:0,overflowX:"auto"}}>
          {sections.map(s=>(
            <button key={s.id} onClick={()=>setActiveSection(s.id)} style={{
              padding:"11px 16px",background:"none",border:"none",cursor:"pointer",
              color:activeSection===s.id?"#fff":"rgba(255,255,255,0.55)",
              fontFamily:"sans-serif",fontSize:"0.76rem",fontWeight:activeSection===s.id?700:400,
              borderBottom:activeSection===s.id?"3px solid #fff":"3px solid transparent",
              whiteSpace:"nowrap",letterSpacing:"0.02em",transition:"all 0.15s",
            }}>
              <span style={{marginRight:5,opacity:0.7}}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"28px 24px"}}>

        {/* ═══ OVERVIEW ═══════════════════════════════════════════ */}
        {activeSection==="overview" && (
          <div>
            {/* Big intro card */}
            <div style={{...card,borderTop:`4px solid ${C.teal}`,padding:"32px 36px",marginBottom:16}}>
              <div style={{display:"flex",gap:24,alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.18em",color:C.teal,fontFamily:"sans-serif",fontWeight:700,marginBottom:8}}>Lesson Intention</div>
                  <h2 style={{margin:"0 0 12px",fontSize:"1.5rem",color:C.black,fontWeight:700,lineHeight:1.3}}>
                    Personal identity determines how you define your space, function, engage, and add value to your work.
                  </h2>
                  <p style={{color:C.gray,fontSize:"0.88rem",lineHeight:1.75,margin:"0 0 16px",fontFamily:"sans-serif"}}>
                    Before you can build a business, you have to know who is building it. This lesson invites you to explore the full dimensions of your identity — your roots, values, culture, and strengths — and connect them directly to your entrepreneurial path.
                  </p>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    {["Self-Awareness","Values Clarity","Cultural Identity","Role Discovery","Passion Mapping","Personal Expression"].map(t=>(
                      <span key={t} style={{fontSize:"0.68rem",fontFamily:"sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",padding:"4px 10px",borderRadius:4,background:C.tealLight,color:C.teal,border:`1px solid ${C.tealMid}`}}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{flexShrink:0}}>
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="55" stroke={C.grayBorder} strokeWidth="1.5" fill="none"/>
                    <circle cx="60" cy="60" r="38" stroke={C.tealMid} strokeWidth="1.5" fill="none"/>
                    <circle cx="60" cy="60" r="20" fill={C.tealLight} stroke={C.teal} strokeWidth="1.5"/>
                    <text x="60" y="65" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="sans-serif" fill={C.teal}>ID</text>
                    {[0,60,120,180,240,300].map((deg,i)=>{
                      const rad=deg*Math.PI/180;
                      const x=60+48*Math.cos(rad-Math.PI/2);
                      const y=60+48*Math.sin(rad-Math.PI/2);
                      const labels=["Roots","Values","Talents","Culture","Purpose","People"];
                      return <circle key={i} cx={x} cy={y} r="6" fill={C.heading} opacity="0.8"/>;
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Token breakdown */}
            <div style={{...card}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:4,height:22,background:C.gold,borderRadius:2}}/>
                <h3 style={{margin:0,fontSize:"0.95rem",fontWeight:700,color:C.black}}>Assignment Token Breakdown</h3>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
                {[
                  {label:"Self-Assessment",   tokens:5,  activity:"A1 · Role Assessment"},
                  {label:"Who Am I?",          tokens:5,  activity:"A6 · Self-Discovery"},
                  {label:"Credentials",        tokens:5,  activity:"A2–A5 · Activities"},
                  {label:"Biography Summary",  tokens:10, activity:"Personal Profile"},
                  {label:"CV",                 tokens:25, activity:"Full Résumé / CV"},
                ].map(t=>(
                  <div key={t.label} style={{background:C.bgSoft,borderRadius:10,padding:"14px",border:`1px solid ${C.grayBorder}`,textAlign:"center"}}>
                    <div style={{fontSize:"1.8rem",fontWeight:900,color:C.heading,fontFamily:"sans-serif",lineHeight:1}}>{t.tokens}</div>
                    <div style={{fontSize:"0.72rem",fontWeight:700,color:C.black,marginTop:4,fontFamily:"sans-serif"}}>{t.label}</div>
                    <div style={{fontSize:"0.65rem",color:C.grayLight,marginTop:2,fontFamily:"sans-serif"}}>{t.activity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {icon:"▣",num:"A1",title:"Role Assessment",desc:"10 questions mapping your strengths to 7 professional roles and 9 character dimensions.",tokens:5,section:"assessment"},
                {icon:"◉",num:"A2",title:"Passion Compass",desc:"Identify what you love doing, what you care about, what you're good at, and the impact you want to make.",tokens:"—",section:"compass"},
                {icon:"◇",num:"A3",title:"Values Sort",desc:"From 20 values, choose your top 5 and reflect on why they define your decisions.",tokens:"—",section:"values"},
                {icon:"○",num:"A4",title:"Identity Wheel",desc:"Complete 6 identity dimensions — your roots, values, talents, culture, purpose, and people.",tokens:"—",section:"wheel"},
                {icon:"▷",num:"A5",title:"Origin Story",desc:"Answer one of 4 reflection prompts to surface the personal story at the heart of your business idea.",tokens:"—",section:"story"},
                {icon:"◆",num:"A6",title:"Who Am I? Self-Discovery",desc:"Map your Capabilities, Strengths, Weaknesses, Triggers, Balance, Expression, and Performance across 4 dimensions of self.",tokens:5,section:"whoami"},
              ].map(a=>(
                <div key={a.num} onClick={()=>setActiveSection(a.section)} style={{...card,cursor:"pointer",padding:"20px 22px",marginBottom:0,transition:"box-shadow 0.15s",":hover":{boxShadow:"0 4px 18px rgba(0,0,0,0.1)"}}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <span style={{color:C.teal,fontSize:"0.9rem"}}>{a.icon}</span>
                      <span style={{fontSize:"0.65rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.grayLight,fontFamily:"sans-serif"}}>{a.num}</span>
                    </div>
                    {a.tokens!=="—" && <span style={{fontSize:"0.65rem",fontWeight:700,padding:"2px 8px",borderRadius:4,background:"#fbe8ec",color:C.heading,fontFamily:"sans-serif"}}>{a.tokens} tokens</span>}
                  </div>
                  <div style={{fontWeight:700,color:C.black,fontSize:"0.92rem",marginBottom:5}}>{a.title}</div>
                  <div style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.55,fontFamily:"sans-serif"}}>{a.desc}</div>
                  <div style={{marginTop:10,fontSize:"0.7rem",color:C.teal,fontFamily:"sans-serif",fontWeight:700}}>Open activity →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LESSON CONTENT ══════════════════════════════════════ */}
        {activeSection==="lesson" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.heading}`}}>
              {sectionTitle("The Power of Identity","Personal identity is the foundation of everything you will build in this program.")}
              <p style={{color:C.gray,fontSize:"0.9rem",lineHeight:1.8,fontFamily:"sans-serif"}}>
                Personal identity is a complex construct that encompasses multiple dimensions of who we are as individuals. It includes our genetic makeup, which provides the biological foundation of our traits and predispositions. Our genealogy connects us to our ancestors and cultural heritage, providing context for our existence. Personality traits — the consistent patterns in how we think, feel, and behave — form the psychological core of our identity.
              </p>
              <p style={{color:C.gray,fontSize:"0.9rem",lineHeight:1.8,fontFamily:"sans-serif"}}>
                Personal values serve as our internal compass, guiding decisions and behaviors. Cultural influences from family, education, and career shape our worldview and aspirations. Principles such as equity, regenerative economy, and environmental stewardship reflect our commitment to broader societal and planetary well-being.
              </p>
            </div>

            {/* 4 functions */}
            <div style={card}>
              {sectionTitle("The Foundation of Personal Identity","Personal identity determines how we navigate the world.")}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  {icon:"◈",title:"Define Our Space",body:"We claim our place in the world by knowing who we are and what we stand for."},
                  {icon:"◆",title:"Function in Roles",body:"Our identity shapes how we show up in different contexts — as colleagues, leaders, creators."},
                  {icon:"○",title:"Engage Meaningfully",body:"Authentic identity enables genuine connection with others and deeper collaboration."},
                  {icon:"▷",title:"Add Value",body:"Knowing your strengths allows you to contribute in ways that are uniquely yours."},
                ].map(f=>(
                  <div key={f.title} style={{background:C.bgSoft,borderRadius:10,padding:"16px",border:`1px solid ${C.grayBorder}`}}>
                    <span style={{color:C.teal,fontSize:"1rem",display:"block",marginBottom:6}}>{f.icon}</span>
                    <div style={{fontWeight:700,color:C.black,fontSize:"0.88rem",marginBottom:4}}>{f.title}</div>
                    <div style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.55,fontFamily:"sans-serif"}}>{f.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div style={card}>
              {sectionTitle("Dimensions of Personal Identity","Who you are is made of many layers.")}
              {[
                {label:"Genetic Background", body:"Your DNA and inherited biological traits form your foundation — the unique starting point of your story."},
                {label:"Genealogy & Heritage",body:"Family history and lineage deepen your sense of belonging. Your ancestors' journeys are part of your identity."},
                {label:"Personality Traits",  body:"Consistent patterns in how you think, feel, and behave define your psychological core."},
                {label:"Personal Values",     body:"Values are your internal compass — honesty, integrity, kindness, authenticity. They guide every decision."},
                {label:"Cultural Identity",   body:"Family values, education, career, heritage, and traditions all shape how you see the world."},
                {label:"Social Values",       body:"Your accomplishments, capabilities, and credentials form your social identity and professional reputation."},
              ].map((d,i)=>(
                <div key={d.label}>
                  <div style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0"}}>
                    <div style={{width:28,height:28,borderRadius:6,background:i%2===0?C.tealLight:"#fbe8ec",border:`1px solid ${i%2===0?C.tealMid:"#f0bcc8"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:900,color:i%2===0?C.teal:C.heading,fontFamily:"sans-serif",flexShrink:0,marginTop:2}}>
                      {i+1}
                    </div>
                    <div>
                      <div style={{fontWeight:700,color:C.black,fontSize:"0.88rem",marginBottom:3}}>{d.label}</div>
                      <div style={{fontSize:"0.8rem",color:C.gray,lineHeight:1.6,fontFamily:"sans-serif"}}>{d.body}</div>
                    </div>
                  </div>
                  {i<5 && <div style={{height:1,background:C.grayBorder}}/>}
                </div>
              ))}
            </div>

            {/* Culture */}
            <div style={card}>
              {sectionTitle("The Role of Culture","Culture is a collective identity shaped by shared values, beliefs, and practices.")}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:"#fbe8ec",borderRadius:10,padding:"18px",border:`1px solid #f0bcc8`}}>
                  <div style={{fontWeight:700,color:C.heading,marginBottom:6,fontSize:"0.88rem"}}>Adapting</div>
                  <ul style={{margin:0,padding:"0 0 0 16px",fontSize:"0.78rem",color:C.gray,lineHeight:1.8,fontFamily:"sans-serif"}}>
                    <li>Adjusting to new environments</li>
                    <li>Maintaining your core identity</li>
                    <li>Flexibility in approach</li>
                    <li>Respecting differences</li>
                  </ul>
                </div>
                <div style={{background:C.tealLight,borderRadius:10,padding:"18px",border:`1px solid ${C.tealMid}`}}>
                  <div style={{fontWeight:700,color:C.teal,marginBottom:6,fontSize:"0.88rem"}}>Adopting</div>
                  <ul style={{margin:0,padding:"0 0 0 16px",fontSize:"0.78rem",color:C.gray,lineHeight:1.8,fontFamily:"sans-serif"}}>
                    <li>Embracing new cultural elements</li>
                    <li>Integrating them into your identity</li>
                    <li>Growth through exchange</li>
                    <li>Expanding your worldview</li>
                  </ul>
                </div>
              </div>
              <div style={{background:C.bgSoft,borderRadius:8,padding:"14px 16px",border:`1px solid ${C.grayBorder}`,fontSize:"0.82rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
                <strong style={{color:C.black}}>Key Insight:</strong> Cultural diversity enriches perspectives, fosters innovation, and promotes inclusion. Embracing diversity enhances our ability to collaborate globally and leads to better decision-making and outcomes.
              </div>
            </div>

            {/* Quote */}
            <div style={{borderLeft:`4px solid ${C.heading}`,padding:"16px 20px",background:C.bgSoft,borderRadius:"0 10px 10px 0",marginBottom:16}}>
              <p style={{margin:0,fontSize:"1.05rem",fontStyle:"italic",color:C.black,lineHeight:1.65}}>"Your identity is your power — embrace it, develop it, and use it to make a difference."</p>
              <div style={{marginTop:8,fontSize:"0.72rem",fontFamily:"sans-serif",color:C.grayLight,textTransform:"uppercase",letterSpacing:"0.1em"}}>Module 1 · Lesson 1.1</div>
            </div>
          </div>
        )}

        {/* ═══ PERSONAL EXPRESSION ════════════════════════════════ */}
        {activeSection==="expression" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.heading}`}}>
              {sectionTitle("Personal Expression: Your Unique Expression","Personality and expression shape how others perceive you — and how you perceive others.")}
              <p style={{color:C.gray,fontSize:"0.9rem",lineHeight:1.8,fontFamily:"sans-serif",marginTop:0}}>
                Personal expression is the outward manifestation of your internal identity, personality, and values. It is the primary mechanism through which you communicate who you are to the world — and how you interpret others. The relationship is bidirectional: your personality shapes how you express yourself, while your chosen forms of expression reinforce and develop aspects of your personality.
              </p>
            </div>

            {/* Personality Types */}
            <div style={card}>
              {sectionTitle("Understanding Personality Types","Your personality type is the foundation of how you naturally express yourself.")}
              <p style={{color:C.gray,fontSize:"0.86rem",lineHeight:1.75,fontFamily:"sans-serif",margin:"0 0 16px"}}>
                Two primary orientations shape expression. Neither is superior — they are different operating systems. Understanding yours helps you leverage your natural strengths and communicate with greater impact.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:C.tealLight,borderRadius:10,padding:"20px",border:`1px solid ${C.tealMid}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                    <div style={{width:32,height:32,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.82rem",fontWeight:900,color:"#fff",fontFamily:"sans-serif"}}>I</div>
                    <div style={{fontWeight:700,color:C.teal,fontSize:"0.95rem"}}>Introverted</div>
                  </div>
                  {["Draws energy from internal reflection and solitude","Prefers depth over breadth in relationships","Processes information internally before expressing","Excels in deep concentration and analysis","Expression is measured, deliberate, and thoughtful","Thrives in one-on-one or small group settings"].map(pt=>(
                    <div key={pt} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
                      <span style={{color:C.teal,fontSize:"0.65rem",marginTop:3,flexShrink:0}}>◆</span>
                      <span style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.55,fontFamily:"sans-serif"}}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:"#fbe8ec",borderRadius:10,padding:"20px",border:`1px solid #f0bcc8`}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                    <div style={{width:32,height:32,borderRadius:7,background:C.heading,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.82rem",fontWeight:900,color:"#fff",fontFamily:"sans-serif"}}>E</div>
                    <div style={{fontWeight:700,color:C.heading,fontSize:"0.95rem"}}>Extroverted</div>
                  </div>
                  {["Draws energy from external interaction and engagement","Processes thoughts through verbal expression and collaboration","Prefers breadth of connections and dynamic environments","Excels in interactive, fast-paced settings","Expression is spontaneous, enthusiastic, and immediate","Thrives in group settings and collaborative activities"].map(pt=>(
                    <div key={pt} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
                      <span style={{color:C.heading,fontSize:"0.65rem",marginTop:3,flexShrink:0}}>◆</span>
                      <span style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.55,fontFamily:"sans-serif"}}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Forms of Expression */}
            <div style={card}>
              {sectionTitle("Three Forms of Expression","We express ourselves through multiple channels. Effective communicators leverage all three strategically.")}
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {
                    icon:"▣", label:"Written Expression", accent:C.teal, bg:C.tealLight, border:C.tealMid,
                    summary:"Text-based communication — emails, reports, documentation, creative writing.",
                    points:["Allows for careful editing, precision, and refinement of ideas","Creates permanent records of thoughts and decisions","Ideal for complex concepts requiring detailed explanation","Particularly effective for introverts who value reflection","Demonstrates clarity of thought and attention to detail"],
                  },
                  {
                    icon:"○", label:"Visual Expression", accent:C.heading, bg:"#fbe8ec", border:"#f0bcc8",
                    summary:"Communication through sight — body language, fashion, design, art, and presentation.",
                    points:["Conveys messages instantly, often bypassing verbal language","Includes presentation design, workspace organization, personal style","Communicates professionalism, creativity, and cultural awareness","Creates immediate emotional and aesthetic impressions","Shows your standards and values before any words are spoken"],
                  },
                  {
                    icon:"▷", label:"Active Expression", accent:C.gold, bg:C.goldLight, border:C.goldBorder,
                    summary:"Expression through movement, presence, and engagement — the 'doing' aspect.",
                    points:["Includes leadership style, meeting facilitation, problem-solving approach","Demonstrates energy, commitment, and ability to execute","Translates ideas into visible action","Shows up in how you participate and contribute to teams","Particularly powerful for extroverts who thrive on interaction"],
                  },
                ].map(f=>(
                  <div key={f.label} style={{background:f.bg,borderRadius:10,padding:"18px",border:`1px solid ${f.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
                      <span style={{color:f.accent,fontSize:"0.9rem"}}>{f.icon}</span>
                      <div style={{fontWeight:700,color:C.black,fontSize:"0.9rem"}}>{f.label}</div>
                    </div>
                    <p style={{margin:"0 0 10px",fontSize:"0.82rem",color:C.gray,fontStyle:"italic",fontFamily:"sans-serif",lineHeight:1.55}}>{f.summary}</p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                      {f.points.map(pt=>(
                        <div key={pt} style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                          <span style={{color:f.accent,fontSize:"0.6rem",marginTop:3,flexShrink:0}}>◈</span>
                          <span style={{fontSize:"0.76rem",color:C.gray,lineHeight:1.5,fontFamily:"sans-serif"}}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrating */}
            <div style={card}>
              {sectionTitle("Integrating Your Unique Expression","Align your personality type with the right expression forms to maximize your impact.")}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <div style={{background:C.tealLight,borderRadius:9,padding:"14px 16px",border:`1px solid ${C.tealMid}`}}>
                  <div style={{fontWeight:700,color:C.teal,fontSize:"0.85rem",marginBottom:6}}>Introverts Often Excel In</div>
                  <div style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.65,fontFamily:"sans-serif"}}>Written precision, detailed documentation, thoughtful visual design, and deep one-on-one connection. Leverage these channels first, then expand outward.</div>
                </div>
                <div style={{background:"#fbe8ec",borderRadius:9,padding:"14px 16px",border:`1px solid #f0bcc8`}}>
                  <div style={{fontWeight:700,color:C.heading,fontSize:"0.85rem",marginBottom:6}}>Extroverts Often Excel In</div>
                  <div style={{fontSize:"0.78rem",color:C.gray,lineHeight:1.65,fontFamily:"sans-serif"}}>Active engagement, verbal communication, group facilitation, and dynamic collaboration. Use written and visual channels to capture and reinforce what you create through action.</div>
                </div>
              </div>
              <div style={{background:C.bgSoft,borderRadius:8,padding:"14px 16px",border:`1px solid ${C.grayBorder}`,fontSize:"0.82rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
                <strong style={{color:C.black}}>Key Insight:</strong> When personality type aligns with appropriate forms of expression, communication becomes more natural, impactful, and sustainable. Authentic expression builds credibility and trust — it is a strategic professional tool, not just a style preference.
              </div>
            </div>

            {/* Quote */}
            <div style={{borderLeft:`4px solid ${C.teal}`,padding:"16px 20px",background:C.bgSoft,borderRadius:"0 10px 10px 0",marginBottom:16}}>
              <p style={{margin:0,fontSize:"1rem",fontStyle:"italic",color:C.black,lineHeight:1.65}}>"Your unique expression is your voice in the marketplace. Master it — and the world will know exactly who you are before you say a word."</p>
              <div style={{marginTop:8,fontSize:"0.72rem",fontFamily:"sans-serif",color:C.grayLight,textTransform:"uppercase",letterSpacing:"0.1em"}}>Module 1 · Lesson 1.1 · Personal Expression</div>
            </div>
          </div>
        )}

        {/* ═══ ASSESSMENT ════════════════════════════════════════════ */}
        {activeSection==="assessment" && (
          <div style={{maxWidth:680,margin:"0 auto"}}>
            {assessStep==="intro" && (
              <div>
                <div style={{...card,borderTop:`4px solid ${C.heading}`}}>
                  {sectionTitle("A1 · Character & Role Assessment","Discover your natural strengths across 9 dimensions and 7 professional roles.")}
                  <p style={{color:C.gray,fontSize:"0.85rem",lineHeight:1.75,fontFamily:"sans-serif",marginBottom:22}}>
                    This 10-question assessment reveals how you naturally approach problems, communicate, lead, and engage — and maps your capacity across 7 essential roles every business needs.
                  </p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:24}}>
                    {["Problem Solving","Character","Emotional Intelligence","Communication Style","Working Style","Leadership Qualities","Passion","Engagement Style","Cultural Connection","Working Style"].slice(0,8).map(d=>(
                      <div key={d} style={{background:C.bgSoft,borderRadius:7,padding:"9px 12px",border:`1px solid ${C.grayBorder}`,fontSize:"0.73rem",color:C.gray,fontFamily:"sans-serif"}}>{d}</div>
                    ))}
                  </div>
                  <div style={{marginBottom:20}}>
                    <label style={{display:"block",marginBottom:7,fontSize:"0.68rem",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.12em",color:C.teal,fontWeight:700}}>Your Name</label>
                    <input value={assessName} onChange={e=>setAssessName(e.target.value)} placeholder="Enter your name..."
                      style={{width:"100%",padding:"12px 14px",border:`1.5px solid ${assessName.trim()?C.teal:C.grayBorder}`,borderRadius:7,color:C.black,fontSize:"0.9rem",outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",background:C.white,transition:"border-color 0.2s"}}/>
                  </div>
                  <button onClick={()=>assessName.trim()&&setAssessStep("quiz")} style={{width:"100%",padding:"13px",borderRadius:7,background:assessName.trim()?C.heading:C.grayBg,border:"none",color:assessName.trim()?"#fff":C.grayLight,fontSize:"0.85rem",fontWeight:700,cursor:assessName.trim()?"pointer":"not-allowed",fontFamily:"sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}}>
                    Start Assessment →
                  </button>
                </div>
              </div>
            )}

            {assessStep==="quiz" && (
              <div style={{opacity:fading?0:1,transform:fading?"translateY(8px)":"none",transition:"all 0.26s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{color:C.teal,fontSize:"0.82rem"}}>{q.icon}</span>
                    <span style={{fontSize:"0.66rem",textTransform:"uppercase",letterSpacing:"0.12em",color:C.grayLight,fontFamily:"sans-serif"}}>{q.category}</span>
                  </div>
                  <span style={{fontSize:"0.76rem",color:C.grayLight,fontFamily:"sans-serif"}}><strong style={{color:C.black}}>{assessCurrent+1}</strong> / {assessmentQuestions.length}</span>
                </div>
                <div style={{background:C.bgMid,borderRadius:4,height:4,marginBottom:20,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(assessCurrent/assessmentQuestions.length)*100}%`,background:C.heading,borderRadius:4,transition:"width 0.4s ease"}}/>
                </div>
                <div style={card}>
                  <h3 style={{fontSize:"1.15rem",fontWeight:700,margin:"0 0 22px",color:C.black,lineHeight:1.55}}>{q.text}</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:9}}>
                    {q.options.map((opt,i)=>{
                      const isSel=assessSelected===opt;
                      return (
                        <button key={i} onClick={()=>setAssessSelected(opt)} style={{padding:"14px 16px",borderRadius:7,textAlign:"left",background:isSel?C.tealLight:C.bgSoft,border:isSel?`2px solid ${C.teal}`:`1.5px solid ${C.grayBorder}`,color:C.black,cursor:"pointer",fontSize:"0.88rem",lineHeight:1.5,transition:"all 0.15s",fontFamily:"Georgia,serif",display:"flex",alignItems:"flex-start",gap:12}}>
                          <span style={{minWidth:24,height:24,borderRadius:5,background:isSel?C.teal:C.bgMid,color:isSel?"#fff":C.grayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.66rem",fontWeight:700,flexShrink:0,fontFamily:"sans-serif",marginTop:1,transition:"all 0.15s"}}>
                            {["A","B","C","D"][i]}
                          </span>
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={handleAssessNext} disabled={!assessSelected} style={{width:"100%",padding:"12px",borderRadius:7,marginTop:18,background:assessSelected?C.heading:C.grayBg,border:"none",color:assessSelected?"#fff":C.grayLight,fontSize:"0.82rem",fontWeight:700,cursor:assessSelected?"pointer":"not-allowed",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em"}}>
                    {assessCurrent+1===assessmentQuestions.length?"View Results →":"Continue →"}
                  </button>
                </div>
              </div>
            )}

            {assessStep==="results" && (
              <div>
                <div style={{background:C.heading,borderRadius:14,padding:"28px 32px",marginBottom:16,position:"relative",overflow:"hidden"}}>
                  <svg style={{position:"absolute",right:-10,top:-10,opacity:0.1}} width="180" height="140" viewBox="0 0 180 140">
                    <circle cx="150" cy="40" r="70" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    <circle cx="150" cy="40" r="42" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    <circle cx="150" cy="40" r="16" fill="#fff"/>
                  </svg>
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.18em",color:"rgba(255,255,255,0.5)",marginBottom:6,fontFamily:"sans-serif"}}>Results — Character & Role Profile</div>
                    <div style={{fontSize:"1.6rem",fontWeight:700,color:"#fff",marginBottom:4}}>{assessName}</div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.15)",borderRadius:9,padding:"11px 18px",border:"1px solid rgba(255,255,255,0.25)"}}>
                      <div style={{width:38,height:38,borderRadius:7,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",fontWeight:900,color:C.heading,fontFamily:"sans-serif"}}>{topRole.symbol}</div>
                      <div>
                        <div style={{fontSize:"0.58rem",textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(255,255,255,0.5)",fontFamily:"sans-serif",marginBottom:1}}>Primary Role</div>
                        <div style={{fontSize:"1.1rem",fontWeight:700,color:"#fff"}}>{topRole.label}</div>
                        <div style={{fontSize:"0.74rem",color:"rgba(255,255,255,0.7)",fontFamily:"sans-serif"}}>{topRole.desc}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={card}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <h3 style={{margin:0,fontSize:"0.95rem",fontWeight:700,color:C.heading}}>Role Capacity Rubric</h3>
                    <span style={{fontSize:"0.6rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",padding:"3px 8px",borderRadius:4,background:C.tealLight,color:C.teal,border:`1px solid ${C.tealMid}`,fontFamily:"sans-serif"}}>All 7 Roles</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:15}}>
                    {sortedRoles.map((role,i)=>{
                      const pct=Math.round((assessScores[role.key]/MAX_SCORE)*100);
                      const barClr=getRoleColor(role.colorKey);
                      const tier=pct>=70?{label:"High",bg:C.tealLight,fg:C.teal,bdr:C.tealMid}:pct>=40?{label:"Moderate",bg:"#fff8e6",fg:C.gold,bdr:"#f5d870"}:{label:"Emerging",bg:C.grayBg,fg:C.grayLight,bdr:C.grayBorder};
                      return (
                        <div key={role.key}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:30,height:30,borderRadius:6,background:i===0?C.heading:role.colorKey==="teal"?C.tealLight:C.grayBg,border:`1.5px solid ${i===0?C.heading:role.colorKey==="teal"?C.tealMid:C.grayBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:900,fontFamily:"sans-serif",color:i===0?"#fff":barClr}}>
                                {role.symbol}
                              </div>
                              <span style={{fontWeight:600,color:C.black,fontSize:"0.85rem"}}>{role.label}</span>
                              {i===0&&<span style={{fontSize:"0.58rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",padding:"2px 6px",borderRadius:4,background:"#fbe8ec",color:C.heading,border:"1px solid #f0bcc8",fontFamily:"sans-serif"}}>Primary</span>}
                            </div>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontSize:"0.65rem",fontWeight:700,padding:"2px 7px",borderRadius:4,background:tier.bg,color:tier.fg,border:`1px solid ${tier.bdr}`,fontFamily:"sans-serif"}}>{tier.label}</span>
                              <span style={{fontSize:"0.92rem",fontWeight:900,color:i===0?C.heading:barClr,minWidth:36,textAlign:"right",fontFamily:"sans-serif"}}>{pct}%</span>
                            </div>
                          </div>
                          <ProgressBar value={assessScores[role.key]} max={MAX_SCORE} barColor={i===0?C.heading:barClr}/>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{...card,background:"#fbe8ec",border:`1px solid #f0bcc8`}}>
                  <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.14em",color:C.heading,fontFamily:"sans-serif",fontWeight:700,marginBottom:8}}>Reflection Prompt</div>
                  <p style={{margin:0,color:C.gray,fontSize:"0.85rem",lineHeight:1.75,fontFamily:"sans-serif"}}>
                    Your primary role as a <strong style={{color:C.heading}}>{topRole.label}</strong> will be your greatest asset in building your business. Reflect: How does this role connect to the business idea you're developing? How might it shape the way you serve your customers?
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ PASSION COMPASS ══════════════════════════════════════ */}
        {activeSection==="compass" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.teal}`}}>
              {sectionTitle("A2 · Passion Compass","Map the intersection of what you love, what you care about, what you're good at, and the impact you want to make.")}
              <p style={{color:C.gray,fontSize:"0.83rem",lineHeight:1.75,fontFamily:"sans-serif",marginBottom:20}}>
                The most sustainable businesses are built at the crossroads of passion, purpose, skill, and community need. This activity helps you find your crossroads. Write freely — there are no wrong answers.
              </p>
              {/* Visual compass diagram */}
              <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" stroke={C.grayBorder} strokeWidth="1" fill="none"/>
                  <line x1="100" y1="10" x2="100" y2="190" stroke={C.grayBorder} strokeWidth="1"/>
                  <line x1="10" y1="100" x2="190" y2="100" stroke={C.grayBorder} strokeWidth="1"/>
                  <circle cx="100" cy="100" r="18" fill={C.heading} opacity="0.9"/>
                  <text x="100" y="105" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="sans-serif" fill="#fff">YOU</text>
                  <text x="100" y="28"  textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={C.teal} fontWeight="700">LOVE</text>
                  <text x="100" y="180" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={C.teal} fontWeight="700">IMPACT</text>
                  <text x="25"  y="104" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={C.heading} fontWeight="700">CARE</text>
                  <text x="175" y="104" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill={C.heading} fontWeight="700">SKILL</text>
                </svg>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {passionCategories.map(pc=>(
                  <div key={pc.id} style={{background:C.bgSoft,borderRadius:10,padding:"18px",border:`1px solid ${C.grayBorder}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{color:C.teal,fontSize:"0.85rem"}}>{pc.icon}</span>
                      <span style={{fontWeight:700,color:C.black,fontSize:"0.88rem"}}>{pc.label}</span>
                    </div>
                    <div style={{fontSize:"0.75rem",color:C.gray,fontFamily:"sans-serif",marginBottom:8,fontStyle:"italic"}}>{pc.prompt}</div>
                    <textarea
                      value={passionAnswers[pc.id]}
                      onChange={e=>setPassionAnswers({...passionAnswers,[pc.id]:e.target.value})}
                      placeholder={pc.placeholder}
                      rows={3}
                      style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${passionAnswers[pc.id]?C.teal:C.grayBorder}`,borderRadius:7,color:C.black,fontSize:"0.85rem",outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",background:C.white,resize:"vertical",lineHeight:1.6,transition:"border-color 0.2s"}}
                    />
                  </div>
                ))}
              </div>

              <Divider/>
              <div style={{background:C.tealLight,borderRadius:9,padding:"14px 18px",border:`1px solid ${C.tealMid}`,marginBottom:16}}>
                <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",color:C.teal,fontFamily:"sans-serif",fontWeight:700,marginBottom:6}}>Insight Prompt</div>
                <p style={{margin:0,fontSize:"0.82rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
                  Look at your four answers. Where do they overlap? The intersection of what you <em>love</em>, <em>care about</em>, are <em>good at</em>, and want to <em>impact</em> is the seed of your business idea.
                </p>
              </div>
              <button onClick={()=>setPassionSaved(true)} style={{width:"100%",padding:"13px",borderRadius:7,background:C.heading,border:"none",color:"#fff",fontSize:"0.85rem",fontWeight:700,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer"}}>
                {passionSaved?"✓ Saved":"Save My Compass"}
              </button>
            </div>
          </div>
        )}

        {/* ═══ VALUES SORT ══════════════════════════════════════════ */}
        {activeSection==="values" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.heading}`}}>
              {sectionTitle("A3 · Values Sort","Select your top 5 personal values — the ones that guide your decisions and define who you are.")}
              <p style={{color:C.gray,fontSize:"0.83rem",lineHeight:1.75,fontFamily:"sans-serif",marginBottom:6}}>
                From the 20 values below, choose exactly <strong style={{color:C.black}}>5</strong> that feel most true to who you are. These are not aspirational — choose what <em>already</em> guides you.
              </p>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
                <div style={{height:6,flex:1,background:C.bgMid,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(selectedValues.length/5)*100}%`,background:selectedValues.length===5?C.teal:C.heading,borderRadius:3,transition:"width 0.3s ease"}}/>
                </div>
                <span style={{fontSize:"0.78rem",fontFamily:"sans-serif",fontWeight:700,color:selectedValues.length===5?C.teal:C.heading}}>{selectedValues.length}/5</span>
              </div>

              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
                {allValues.map(v=>{
                  const isSel=selectedValues.includes(v);
                  const disabled=!isSel&&selectedValues.length===5;
                  return (
                    <button key={v} onClick={()=>!disabled&&toggleValue(v)} style={{padding:"9px 16px",borderRadius:7,fontSize:"0.82rem",fontFamily:"Georgia,serif",cursor:disabled?"not-allowed":"pointer",background:isSel?"#fbe8ec":C.bgSoft,border:isSel?`2px solid ${C.heading}`:`1.5px solid ${C.grayBorder}`,color:isSel?C.heading:disabled?C.grayLight:C.black,fontWeight:isSel?700:400,transition:"all 0.15s",opacity:disabled?0.5:1}}>
                      {isSel&&"✓ "}{v}
                    </button>
                  );
                })}
              </div>

              {selectedValues.length===5 && (
                <div style={{marginBottom:16}}>
                  <div style={{fontWeight:700,color:C.black,marginBottom:10,fontSize:"0.88rem"}}>Reflect on your top 5:</div>
                  {selectedValues.map(v=>(
                    <div key={v} style={{marginBottom:10}}>
                      <div style={{fontSize:"0.75rem",fontWeight:700,color:C.heading,marginBottom:4,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.08em"}}>{v}</div>
                      <input placeholder={`How does "${v}" show up in your daily life or business decisions?`}
                        style={{width:"100%",padding:"10px 12px",border:`1.5px solid ${C.grayBorder}`,borderRadius:7,color:C.black,fontSize:"0.82rem",outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",background:C.white}}/>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={()=>setValuesSaved(true)} disabled={selectedValues.length<5} style={{width:"100%",padding:"13px",borderRadius:7,background:selectedValues.length===5?C.heading:C.grayBg,border:"none",color:selectedValues.length===5?"#fff":C.grayLight,fontSize:"0.85rem",fontWeight:700,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em",cursor:selectedValues.length===5?"pointer":"not-allowed"}}>
                {valuesSaved?"✓ Saved":"Save My Values"}
              </button>
            </div>
          </div>
        )}

        {/* ═══ IDENTITY WHEEL ═══════════════════════════════════════ */}
        {activeSection==="wheel" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.teal}`}}>
              {sectionTitle("A4 · Identity Wheel","Complete each dimension of your personal identity. This is your foundation as a business owner.")}
              <p style={{color:C.gray,fontSize:"0.83rem",lineHeight:1.75,fontFamily:"sans-serif",marginBottom:22}}>
                Your business will be an extension of who you are. The more clearly you see yourself, the more authentically you can build. Take your time with each prompt.
              </p>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {wheelSegments.map((seg,i)=>(
                  <div key={seg.id} style={{background:C.bgSoft,borderRadius:10,padding:"16px",border:`1px solid ${C.grayBorder}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{width:28,height:28,borderRadius:6,background:i%2===0?"#fbe8ec":C.tealLight,border:`1px solid ${i%2===0?"#f0bcc8":C.tealMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",color:i%2===0?C.heading:C.teal,flexShrink:0}}>
                        {seg.icon}
                      </div>
                      <span style={{fontWeight:700,color:C.black,fontSize:"0.85rem"}}>{seg.label}</span>
                    </div>
                    <div style={{fontSize:"0.72rem",color:C.gray,fontFamily:"sans-serif",marginBottom:8,fontStyle:"italic",lineHeight:1.5}}>{seg.prompt}</div>
                    <textarea
                      value={wheelAnswers[seg.id]}
                      onChange={e=>setWheelAnswers({...wheelAnswers,[seg.id]:e.target.value})}
                      placeholder="Write freely..."
                      rows={3}
                      style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${wheelAnswers[seg.id]?C.teal:C.grayBorder}`,borderRadius:7,color:C.black,fontSize:"0.82rem",outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",background:C.white,resize:"vertical",lineHeight:1.6,transition:"border-color 0.2s"}}
                    />
                  </div>
                ))}
              </div>

              <Divider/>
              <div style={{background:"#fbe8ec",borderRadius:9,padding:"14px 18px",border:"1px solid #f0bcc8",marginBottom:16}}>
                <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",color:C.heading,fontFamily:"sans-serif",fontWeight:700,marginBottom:6}}>Connecting to Business</div>
                <p style={{margin:0,fontSize:"0.82rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
                  Review your six responses. Which dimension feels most connected to your business idea? Your roots, values, and purpose often become the most powerful part of your brand story.
                </p>
              </div>
              <button onClick={()=>setWheelSaved(true)} style={{width:"100%",padding:"13px",borderRadius:7,background:C.heading,border:"none",color:"#fff",fontSize:"0.85rem",fontWeight:700,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer"}}>
                {wheelSaved?"✓ Saved":"Save My Wheel"}
              </button>
            </div>
          </div>
        )}

        {/* ═══ ORIGIN STORY ══════════════════════════════════════════ */}
        {activeSection==="story" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.heading}`}}>
              {sectionTitle("A5 · Origin Story","Every great business has a personal story behind it. Write yours.")}
              <p style={{color:C.gray,fontSize:"0.83rem",lineHeight:1.75,fontFamily:"sans-serif",marginBottom:22}}>
                Choose one of the four prompts below and write your response. This is not about perfection — it's about truth. Your origin story will become the heart of your business pitch, your brand, and your motivation when things get hard.
              </p>

              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                {storyPrompts.map((sp,i)=>(
                  <button key={sp.id} onClick={()=>setStoryPrompt(sp.id===storyPrompt?null:sp.id)} style={{
                    padding:"16px 18px",borderRadius:9,textAlign:"left",cursor:"pointer",
                    background:storyPrompt===sp.id?"#fbe8ec":C.bgSoft,
                    border:storyPrompt===sp.id?`2px solid ${C.heading}`:`1.5px solid ${C.grayBorder}`,
                    fontFamily:"Georgia,serif",transition:"all 0.15s",
                  }}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                      <div style={{width:24,height:24,borderRadius:5,background:storyPrompt===sp.id?C.heading:C.bgMid,color:storyPrompt===sp.id?"#fff":C.grayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",fontWeight:900,fontFamily:"sans-serif",flexShrink:0,marginTop:1,transition:"all 0.15s"}}>
                        {i+1}
                      </div>
                      <span style={{fontSize:"0.88rem",color:storyPrompt===sp.id?C.heading:C.black,fontWeight:storyPrompt===sp.id?700:400,lineHeight:1.55}}>{sp.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {storyPrompt && (
                <div>
                  <div style={{fontWeight:700,color:C.black,fontSize:"0.85rem",marginBottom:8}}>Your Response:</div>
                  <textarea
                    value={storyText[storyPrompt]||""}
                    onChange={e=>setStoryText({...storyText,[storyPrompt]:e.target.value})}
                    placeholder="Write your story here... Be honest, be specific, be you."
                    rows={10}
                    style={{width:"100%",padding:"14px 16px",border:`1.5px solid ${storyText[storyPrompt]?C.heading:C.grayBorder}`,borderRadius:9,color:C.black,fontSize:"0.9rem",outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif",background:C.white,resize:"vertical",lineHeight:1.75,transition:"border-color 0.2s"}}
                  />
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6,marginBottom:16}}>
                    <span style={{fontSize:"0.72rem",color:C.grayLight,fontFamily:"sans-serif"}}>{(storyText[storyPrompt]||"").split(/\s+/).filter(Boolean).length} words</span>
                    <span style={{fontSize:"0.72rem",color:C.grayLight,fontFamily:"sans-serif"}}>Aim for 150–300 words</span>
                  </div>
                </div>
              )}

              <div style={{background:C.tealLight,borderRadius:9,padding:"14px 18px",border:`1px solid ${C.tealMid}`,marginBottom:16}}>
                <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",color:C.teal,fontFamily:"sans-serif",fontWeight:700,marginBottom:6}}>Why This Matters</div>
                <p style={{margin:0,fontSize:"0.82rem",color:C.gray,lineHeight:1.7,fontFamily:"sans-serif"}}>
                  Your origin story is the most persuasive thing about your business. Customers don't just buy products — they buy people and purpose. When you can tell your story with clarity and conviction, you build trust instantly.
                </p>
              </div>

              {storyPrompt && storyText[storyPrompt] && (
                <button style={{width:"100%",padding:"13px",borderRadius:7,background:C.heading,border:"none",color:"#fff",fontSize:"0.85rem",fontWeight:700,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.07em",cursor:"pointer"}}>
                  Save My Origin Story
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══ WHO AM I — SELF-DISCOVERY ASSESSMENT ═════════════════ */}
        {activeSection==="whoami" && (
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{...card,borderTop:`4px solid ${C.teal}`,padding:"24px 28px",marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                <div>
                  <div style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.18em",color:C.teal,fontFamily:"sans-serif",fontWeight:700,marginBottom:6}}>A6 · Self-Discovery Assessment · 5 Tokens</div>
                  <h2 style={{margin:"0 0 6px",fontSize:"1.2rem",fontWeight:700,color:C.black,fontFamily:"Georgia,serif"}}>Who Am I?</h2>
                  <p style={{margin:0,fontSize:"0.82rem",color:C.gray,fontFamily:"sans-serif",lineHeight:1.6}}>Map yourself across 7 dimensions of character and 4 dimensions of self. The most complete picture of who you are right now.</p>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {["Mentally","Emotionally","Spiritually","Physically"].map((d,i)=>{
                    const dimClrs = ["#1e3a5f","#7c2d8e","#b45309","#065f46"];
                    return (
                      <div key={d} style={{padding:"5px 11px",borderRadius:6,background:dimClrs[i],fontSize:"0.68rem",fontWeight:700,color:"#fff",fontFamily:"sans-serif",letterSpacing:"0.06em"}}>
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>
              <WhoAmITool />
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{borderTop:`1px solid ${C.grayBorder}`,padding:"16px 24px",textAlign:"center",background:C.white,marginTop:20}}>
        <span style={{fontSize:"0.7rem",color:C.grayLight,fontFamily:"sans-serif",letterSpacing:"0.08em"}}>
          MICROBIZ STARTUP JOURNEY · MODULE 1 · LESSON 1.1 · PERSONAL IDENTITY &amp; PERSONAL EXPRESSION
        </span>
      </div>
    </div>
  );
}

'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function LoginView() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 font-mono relative overflow-hidden opacity-0 animate-fade-in">
      {/* Background hacker effects */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_70%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-40"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center text-emerald-500 mb-6 text-5xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <i className="fa-solid fa-terminal animate-pulse"></i>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-widest text-emerald-400">
          SYSTEM.USER.LOGIN()
        </h2>
        <p className="text-center text-zinc-500 mt-3 text-xs tracking-widest uppercase">Authenticating connection to secure workspace...</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-zinc-950 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-zinc-800 rounded-2xl overflow-hidden relative">
          
          {/* Terminal Header */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest flex items-center gap-2"><i className="fa-solid fa-lock text-[9px] text-emerald-500/50"></i> root@auth-server:~</div>
            <div className="w-10"></div> {/* Spacer for center alignment */}
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 sm:px-10 pb-8 bg-zinc-950 relative">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[length:100%_4px] opacity-50"></div>
            
            <Auth 
              supabaseClient={supabase} 
              appearance={{ 
                theme: ThemeSupa, 
                variables: { 
                  default: { 
                    colors: { brand: '#10b981', brandAccent: '#10b981', defaultButtonBackground: 'transparent', defaultButtonBackgroundHover: 'rgba(16, 185, 129, 0.05)' },
                    borderWidths: { buttonBorderWidth: '1px', inputBorderWidth: '0px' },
                    radii: { borderRadiusButton: '0px', buttonBorderRadius: '0px', inputBorderRadius: '0px' }
                  } 
                },
                className: {
                  button: '!font-mono !text-xs !text-emerald-400 !border !border-emerald-500/30 hover:!border-emerald-400 hover:!text-emerald-300 !transition-all !uppercase !tracking-[0.2em] !mt-4 !py-3 !bg-zinc-950 !rounded-none',
                  input: '!font-mono !text-sm !bg-transparent !border-0 !border-b !border-zinc-800 focus:!border-emerald-500 focus:!ring-0 !text-emerald-400 !px-0 !py-2 !placeholder-zinc-700 !transition-colors !rounded-none !shadow-none',
                  label: '!font-mono !text-emerald-500/70 !text-[10px] !uppercase !tracking-[0.2em] !mb-0 !flex !items-center !gap-2 before:content-[\'>\'] before:text-emerald-500/70',
                  anchor: '!text-zinc-500 hover:!text-emerald-400 !font-mono !text-[10px] !uppercase !tracking-widest !transition-colors',
                  message: '!text-rose-400 !font-mono !text-xs !mt-2'
                }
              }} 
              providers={[]} 
              theme="dark" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardView({ session }) {
  const [links, setLinks] = useState([])
  const [scratchpad, setScratchpad] = useState('')
  const [padMode, setPadMode] = useState('text') // 'text' or 'todo'
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  // System Monitor State
  const [sysCpu, setSysCpu] = useState('N/A')
  const [sysRam, setSysRam] = useState('N/A')
  const [sysNetDown, setSysNetDown] = useState(0)
  const [sysNetRtt, setSysNetRtt] = useState(0)
  const [sysBatLvl, setSysBatLvl] = useState('N/A')
  const [sysBatChg, setSysBatChg] = useState(false)
  const [localIp, setLocalIp] = useState('192.168.1.x')
  const [publicIp, setPublicIp] = useState('...')

  // Clock
  const [time, setTime] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [greeting, setGreeting] = useState('')

  // Ping Terminal
  const pingSeq = useRef(1)
  const [pingLogs, setPingLogs] = useState([])

  useEffect(() => {
    fetchData(session.user.id)
  }, [session])

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      const now = new Date()
      const hrs = now.getHours()
      setTime(`${String(hrs).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} WIB`)
      setDateStr(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))
      
      let p = 'selamat bekerja'
      if (hrs >= 4 && hrs < 11) p = 'selamat pagi'
      else if (hrs >= 11 && hrs < 15) p = 'selamat siang'
      else if (hrs >= 15 && hrs < 18) p = 'selamat sore'
      else p = 'selamat malam'
      setGreeting(p)
    }, 1000)

    // Sys Monitor
    setSysCpu(navigator.hardwareConcurrency || 'N/A')
    const updateSys = async () => {
      if (performance && performance.memory) {
        setSysRam((performance.memory.usedJSHeapSize / 1048576).toFixed(1))
      }
      if (navigator.connection) {
        setSysNetDown(navigator.connection.downlink || 0)
        setSysNetRtt(navigator.connection.rtt || 0)
      }
      if (navigator.getBattery) {
        try {
          const b = await navigator.getBattery()
          setSysBatLvl(Math.round(b.level * 100))
          setSysBatChg(b.charging)
        } catch(e) {}
      }
    }
    updateSys()
    const sysTimer = setInterval(updateSys, 2000)

    // IP
    setLocalIp(localStorage.getItem('mywork_local_ip') || '192.168.1.x')
    fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(d=>setPublicIp(d.ip)).catch(()=>setPublicIp('Offline'))

    // Ping Terminal Logic
    const pingTimer = setInterval(() => {
      const isOnline = navigator.onLine
      const time = (Math.random() * 20 + 10).toFixed(1)
      const currentSeq = pingSeq.current++
      
      setPingLogs(prev => {
        const newLog = isOnline 
          ? `64 bytes from 8.8.8.8: icmp_seq=${currentSeq} ttl=117 time=${time} ms`
          : `ping: sendmsg: Network is unreachable`
        
        const logs = [...prev, { id: currentSeq, text: newLog, isOnline }]
        if (logs.length > 7) logs.shift()
        return logs
      })
    }, 1500)

    return () => { clearInterval(timer); clearInterval(sysTimer); clearInterval(pingTimer) }
  }, [])

  // Handle Ctrl+F untuk fokus search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const fetchData = async (userId) => {
    setLoading(true)
    // Fetch links
    const { data: linksData } = await supabase.from('links').select('*').order('created_at', { ascending: false })
    if (linksData) {
      const savedOrder = JSON.parse(localStorage.getItem('mywork_link_order')) || []
      if (savedOrder.length > 0) {
        linksData.sort((a, b) => {
          const idxA = savedOrder.indexOf(a.id)
          const idxB = savedOrder.indexOf(b.id)
          if (idxA === -1 && idxB === -1) return 0
          if (idxA === -1) return 1
          if (idxB === -1) return -1
          return idxA - idxB
        })
      }
      setLinks(linksData)
    }

    // Fetch scratchpad
    const { data: padData } = await supabase.from('scratchpad').select('content').eq('user_id', userId).single()
    if (padData) setScratchpad(padData.content)
    setLoading(false)
  }

  const handleSaveScratchpad = async (val) => {
    setScratchpad(val)
    if (!session) return
    const { data } = await supabase.from('scratchpad').select('id').eq('user_id', session.user.id).single()
    if (data) {
      await supabase.from('scratchpad').update({ content: val, updated_at: new Date() }).eq('id', data.id)
    } else {
      await supabase.from('scratchpad').insert({ user_id: session.user.id, content: val })
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [editingLinkId, setEditingLinkId] = useState(null)
  const [newLink, setNewLink] = useState({ title: '', url: '', category: 'Web & Project', color: 'emerald', icon: 'fa-solid fa-globe' })

  const availableIcons = [
    'fa-solid fa-globe', 'fa-solid fa-server', 'fa-solid fa-database', 
    'fa-solid fa-code', 'fa-solid fa-terminal', 'fa-solid fa-laptop-code',
    'fa-brands fa-github', 'fa-brands fa-google', 'fa-solid fa-briefcase',
    'fa-solid fa-wallet', 'fa-solid fa-gamepad', 'fa-solid fa-book'
  ]
  const availableColors = ['emerald', 'cyan', 'indigo', 'rose', 'amber', 'purple']

  const handleAddLink = async (e) => {
    e.preventDefault()
    if(!session) return
    
    const linkData = {
      user_id: session.user.id,
      title: newLink.title,
      url: newLink.url,
      category: newLink.category,
      color: newLink.color,
      icon: newLink.icon
    }
    
    if (editingLinkId) {
      const { data } = await supabase.from('links').update(linkData).eq('id', editingLinkId).select().single()
      if (data) {
        setLinks(links.map(l => l.id === editingLinkId ? data : l))
        setIsModalOpen(false)
        setEditingLinkId(null)
      }
    } else {
      const { data } = await supabase.from('links').insert(linkData).select().single()
      if (data) {
        setLinks([data, ...links])
        setIsModalOpen(false)
      }
    }
  }

  const handleEdit = (link) => {
    setEditingLinkId(link.id)
    setNewLink({ title: link.title, url: link.url, category: link.category, color: link.color, icon: link.icon })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if(!confirm('Hapus link ini?')) return
    await supabase.from('links').delete().eq('id', id)
    setLinks(links.filter(l => l.id !== id))
  }

  const handleDragStart = (e, linkId) => {
    dragItem.current = linkId
    e.dataTransfer.effectAllowed = "move"
    setTimeout(() => { e.target.style.opacity = '0.5' }, 0)
  }

  const handleDragEnter = (e, linkId) => {
    dragOverItem.current = linkId
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    if (!dragItem.current || !dragOverItem.current || dragItem.current === dragOverItem.current) return
    
    if (activeCategory !== 'Semua' || searchQuery !== '') {
      alert("Custom sorting (Drag & Drop) hanya bisa dilakukan saat melihat 'Semua' kategori tanpa pencarian.")
      dragItem.current = null
      dragOverItem.current = null
      return
    }

    const copyListItems = [...links]
    const dragIndex = copyListItems.findIndex(l => l.id === dragItem.current)
    const overIndex = copyListItems.findIndex(l => l.id === dragOverItem.current)
    
    if (dragIndex === -1 || overIndex === -1) return

    const dragItemContent = copyListItems[dragIndex]
    copyListItems.splice(dragIndex, 1)
    copyListItems.splice(overIndex, 0, dragItemContent)
    
    dragItem.current = null
    dragOverItem.current = null
    
    setLinks(copyListItems)
    localStorage.setItem('mywork_link_order', JSON.stringify(copyListItems.map(l => l.id)))
  }

  const handleToggleFav = async (link) => {
    const newVal = !link.favorite
    await supabase.from('links').update({ favorite: newVal }).eq('id', link.id)
    setLinks(links.map(l => l.id === link.id ? { ...l, favorite: newVal } : l))
  }

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const categories = ['Semua', 'Favorit', ...Array.from(new Set(links.map(l => l.category)))]
  const filteredLinks = links.filter(l => {
    const matchCat = activeCategory === 'Semua' ? true : activeCategory === 'Favorit' ? l.favorite : l.category === activeCategory
    const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.url.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col opacity-0 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <i className="fa-solid fa-terminal text-sm"></i>
            </div>
            <h1 className="text-base font-semibold text-white tracking-tight hidden md:block">My-Work</h1>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <div className="hidden lg:flex flex-col items-end mr-3 text-right">
              <div className="text-sm font-medium text-emerald-400 font-mono">{time || '00:00:00'}</div>
              <div className="text-[10px] text-zinc-500 font-mono">{dateStr || 'Memuat...'}</div>
            </div>
            <button onClick={() => {
              setEditingLinkId(null)
              setNewLink({ title: '', url: '', category: 'Web & Project', color: 'emerald', icon: 'fa-solid fa-globe' })
              setIsModalOpen(true)
            }} className="h-9 px-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 transition shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              <i className="fa-solid fa-plus text-sm"></i>
              <span className="hidden sm:inline text-sm font-medium font-mono">Link Baru</span>
            </button>
            <button onClick={handleLogout} className="h-9 px-3 flex items-center justify-center gap-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition ml-2">
              <i className="fa-solid fa-power-off text-sm"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 lg:gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {/* Left: Main Workspace */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          
          {/* Hacker Command Center */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-zinc-950 border border-emerald-500/20 p-5 rounded-2xl relative overflow-hidden transition-colors">
            <div className="relative z-10 w-full lg:w-auto">
              <div className="text-[10px] text-emerald-500/50 uppercase tracking-widest mb-1.5 font-mono flex items-center gap-1.5"><i className="fa-solid fa-bolt"></i> system.workspace.init()</div>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tracking-tight flex items-center">
                <span className="mr-2 text-zinc-600">&gt;</span> 
                <span>{greeting}, {session.user.email.split('@')[0]}</span>
                <span className="w-2 h-5 bg-emerald-400 ml-2 animate-pulse inline-block"></span>
              </h2>
            </div>
            <div className="w-full lg:w-96 relative z-10">
              <i className="fa-solid fa-terminal absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500/50 text-xs"></i>
              <input 
                ref={searchInputRef}
                type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="execute_search(query)..." 
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-emerald-500/30 text-sm font-mono text-emerald-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:bg-zinc-950 focus:ring-1 focus:ring-emerald-500/40 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar w-full">
            {categories.map(cat => (
              <button 
                key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeCategory === cat ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                {cat === 'Favorit' && <i className="fa-solid fa-star text-amber-400"></i>}
                {cat}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeCategory === cat ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-800/50 text-zinc-500'}`}>
                  {cat === 'Semua' ? links.length : cat === 'Favorit' ? links.filter(l=>l.favorite).length : links.filter(l=>l.category===cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* List View */}
          <div className="flex flex-col gap-3">
            {loading ? <div className="text-emerald-400">Loading data dari Supabase...</div> : 
             filteredLinks.map(link => {
              // Simulasi data analitik (konsisten berdasarkan ID)
              const seed = (str) => { let h = 0; for(let i=0;i<str.length;i++) h=Math.imul(31, h)+str.charCodeAt(i)|0; return h; };
              const h1 = 20 + Math.abs(seed(link.id+'1')) % 80;
              const h2 = 20 + Math.abs(seed(link.id+'2')) % 80;
              const h3 = 20 + Math.abs(seed(link.id+'3')) % 80;
              const h4 = 20 + Math.abs(seed(link.id+'4')) % 80;
              const h5 = 20 + Math.abs(seed(link.id+'5')) % 80;
              const h6 = 20 + Math.abs(seed(link.id+'6')) % 80;
              const h7 = 20 + Math.abs(seed(link.id+'7')) % 80;
              const avgClicks = Math.floor((h1+h2+h3+h4+h5+h6+h7)/7);
              
              const isDraggable = activeCategory === 'Semua' && searchQuery === '';

              return (
              <div 
                key={link.id} 
                draggable={isDraggable}
                onDragStart={(e) => handleDragStart(e, link.id)}
                onDragEnter={(e) => handleDragEnter(e, link.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`group flex flex-col sm:flex-row items-center p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:bg-zinc-900 hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden gap-4 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
              >
                <div className={`text-zinc-700 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity ${isDraggable ? '' : 'invisible'}`}>
                  <i className="fa-solid fa-grip-vertical"></i>
                </div>
                
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 min-w-0 flex-1 w-full">
                  <div className={`w-12 h-12 shrink-0 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 flex items-center justify-center text-xl border border-${link.color}-500/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] transition-transform group-hover:scale-105`}>
                    <i className={link.icon && link.icon.startsWith('fa-') ? link.icon : "fa-solid fa-link"}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">{link.title}</h3>
                    <p className="text-xs text-zinc-500 truncate mt-0.5 font-mono group-hover:text-zinc-400 transition-colors">{link.url.replace(/^https?:\/\//, '')}</p>
                  </div>
                </a>
                
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/50 shrink-0">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hidden sm:block">
                    {link.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5 opacity-100 transition-opacity">
                    <button onClick={() => handleToggleFav(link)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${link.favorite ? 'text-amber-400 bg-amber-400/10' : 'text-zinc-600 hover:bg-zinc-800 hover:text-white'}`}>
                      <i className={`fa-star text-[11px] ${link.favorite ? 'fa-solid' : 'fa-regular'}`}></i>
                    </button>
                    <button onClick={() => handleEdit(link)} className="w-7 h-7 rounded-lg text-zinc-600 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center justify-center transition-colors">
                      <i className="fa-solid fa-pen text-[11px]"></i>
                    </button>
                    <button onClick={() => handleDelete(link.id)} className="w-7 h-7 rounded-lg text-zinc-600 hover:bg-rose-500/10 hover:text-rose-400 flex items-center justify-center transition-colors">
                      <i className="fa-solid fa-trash-can text-[11px]"></i>
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-3 shrink-0 pl-5 border-l border-zinc-800/50 h-10">
                  <div className="flex flex-col items-end justify-center mr-1">
                    <span className="text-[9px] text-zinc-500 font-mono leading-none mb-1">AVG. CLICKS</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono leading-none">{avgClicks}/d</span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/40 rounded-t-[1px] transition-all duration-500" style={{ height: `${h1}%` }}></div>
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/50 rounded-t-[1px] transition-all duration-500 delay-[50ms]" style={{ height: `${h2}%` }}></div>
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/60 rounded-t-[1px] transition-all duration-500 delay-100" style={{ height: `${h3}%` }}></div>
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/70 rounded-t-[1px] transition-all duration-500 delay-150" style={{ height: `${h4}%` }}></div>
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/80 rounded-t-[1px] transition-all duration-500 delay-200" style={{ height: `${h5}%` }}></div>
                    <div className="w-1.5 bg-zinc-800 group-hover:bg-emerald-500/90 rounded-t-[1px] transition-all duration-500 delay-[250ms]" style={{ height: `${h6}%` }}></div>
                    <div className="w-1.5 bg-emerald-500/30 group-hover:bg-emerald-400 rounded-t-[1px] transition-all duration-500 delay-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ height: `${h7}%` }}></div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[300px] xl:w-[320px] flex flex-col gap-4 shrink-0">
          
          {/* Scratchpad */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                <i className="fa-solid fa-note-sticky text-amber-500/80"></i> Catatan Cepat
              </h3>
              <div className="flex gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800/80">
                <button onClick={()=>setPadMode('text')} className={`text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded transition ${padMode==='text' ? 'bg-zinc-800 text-amber-400' : 'text-zinc-600 hover:text-zinc-400'}`}>Teks</button>
                <button onClick={()=>setPadMode('todo')} className={`text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded transition ${padMode==='todo' ? 'bg-zinc-800 text-amber-400' : 'text-zinc-600 hover:text-zinc-400'}`}>Checklist</button>
              </div>
            </div>

            {padMode === 'text' ? (
              <textarea 
                value={scratchpad}
                onChange={e => handleSaveScratchpad(e.target.value)}
                placeholder="Ketik catatan di sini... (Auto-save)"
                className="flex-1 w-full bg-transparent border-none resize-none text-sm text-zinc-300 placeholder-zinc-600 focus:ring-0 p-0 font-mono hide-scrollbar outline-none leading-relaxed"
              ></textarea>
            ) : (
              <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-1">
                {scratchpad.split('\n').map((line, idx) => {
                  if (line.trim() === '') return null;
                  const isChecked = line.startsWith('[x] ') || line.startsWith('x ');
                  const text = line.replace(/^\[[ x]\] |^[x ] /, '');
                  return (
                    <div key={idx} className="flex items-start gap-2 group p-1.5 hover:bg-zinc-800/30 rounded-lg transition">
                      <button onClick={() => {
                        const lines = scratchpad.split('\n');
                        if (isChecked) lines[idx] = lines[idx].replace(/^\[x\] |^x /, '[ ] ');
                        else {
                          if (lines[idx].startsWith('[ ] ')) lines[idx] = lines[idx].replace(/^\[ \] /, '[x] ');
                          else lines[idx] = '[x] ' + lines[idx];
                        }
                        handleSaveScratchpad(lines.join('\n'));
                      }} className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition ${isChecked ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-zinc-600 text-transparent hover:border-emerald-500'}`}>
                        <i className="fa-solid fa-check text-[9px]"></i>
                      </button>
                      <input 
                        type="text" 
                        value={text} 
                        onChange={(e) => {
                          const lines = scratchpad.split('\n');
                          lines[idx] = (isChecked ? '[x] ' : '[ ] ') + e.target.value;
                          handleSaveScratchpad(lines.join('\n'));
                        }}
                        className={`flex-1 bg-transparent border-none p-0 text-sm focus:ring-0 outline-none font-mono ${isChecked ? 'line-through text-zinc-600' : 'text-zinc-300'}`}
                      />
                      <button onClick={() => {
                        const lines = scratchpad.split('\n');
                        lines.splice(idx, 1);
                        handleSaveScratchpad(lines.join('\n'));
                      }} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-400 transition text-xs px-1">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  )
                })}
                <button onClick={() => {
                  const newPad = scratchpad + (scratchpad && !scratchpad.endsWith('\n') ? '\n' : '') + '[ ] Baru';
                  handleSaveScratchpad(newPad);
                }} className="text-[10px] text-zinc-500 hover:text-amber-400 flex items-center gap-1 mt-2 mb-2 p-1 transition w-max">
                  <i className="fa-solid fa-plus"></i> Tambah Item
                </button>
              </div>
            )}
            <div className="mt-2 pt-3 border-t border-zinc-800/50 flex justify-between items-center text-[10px] text-zinc-500">
              <span className="flex items-center gap-1"><i className="fa-solid fa-cloud-arrow-up"></i> Auto-sync</span>
              <span>{scratchpad.length} karakter</span>
            </div>
          </div>

          {/* Hacker Terminal Simulation */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex flex-col h-56 relative overflow-hidden shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3 z-10 border-b border-zinc-800/50 pb-2">
              <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-terminal text-emerald-500/70"></i> root@localhost
              </h3>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-[light-red_0.7s_infinite]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-[light-yellow_0.7s_infinite]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-[light-green_0.3s_infinite]"></div>
              </div>
            </div>
            <div className="flex-1 w-full overflow-y-auto text-[10px] font-mono space-y-0.5 hide-scrollbar z-10 flex flex-col justify-end">
              {pingLogs.map((log) => (
                <div key={log.id} className={`${log.isOnline ? 'text-emerald-400' : 'text-rose-400'} animate-[terminal-line_0.2s_ease-out_forwards]`}>
                  {log.text}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-40"></div>
          </div>

          {/* System Monitor */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 block">
            <h3 className="text-xs font-semibold text-zinc-200 flex items-center gap-2 mb-3">
              <i className="fa-solid fa-microchip text-cyan-500/80"></i> System Monitor
            </h3>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950/50 border border-zinc-800/30">
                <span className="text-zinc-500"><i className="fa-solid fa-server mr-2 text-[10px]"></i>CPU</span>
                <span className="text-emerald-400">{sysCpu} <span className="text-[10px] text-zinc-500">Threads</span></span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950/50 border border-zinc-800/30">
                <span className="text-zinc-500"><i className="fa-solid fa-memory mr-2 text-[10px]"></i>RAM</span>
                <span className="text-indigo-400">{sysRam} <span className="text-[10px] text-zinc-500">MB</span></span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950/50 border border-zinc-800/30">
                <span className="text-zinc-500"><i className="fa-solid fa-wifi mr-2 text-[10px]"></i>Net</span>
                <span><span className="text-cyan-400">{sysNetDown}</span> <span className="text-[10px] text-zinc-500">Mbps</span> <span className="text-amber-400 ml-1">{sysNetRtt}</span> <span className="text-[10px] text-zinc-500">ms</span></span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950/50 border border-zinc-800/30">
                <span className="text-zinc-500"><i className="fa-solid fa-battery-half mr-2 text-[10px]"></i>Power</span>
                <span className={sysBatLvl < 20 ? 'text-rose-400' : 'text-emerald-400'}>{sysBatLvl}% {sysBatChg && <i className="fa-solid fa-bolt text-amber-400 ml-1"></i>}</span>
              </div>
              <div className="h-px bg-zinc-800/60 my-1"></div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition group">
                <span className="text-zinc-400">My IP (LAN)</span>
                <span className="text-indigo-400/80 hover:text-indigo-400 cursor-pointer" onClick={() => {const ip=prompt('IP:',localIp); if(ip){localStorage.setItem('mywork_local_ip',ip);setLocalIp(ip)}}}>{localIp}</span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition group">
                <span className="text-zinc-400">Public IP</span>
                <span className="text-rose-400/80">{publicIp}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal Add/Edit Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.15s' }}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h2 className="text-lg font-bold text-white mb-4">
              <i className={`fa-solid ${editingLinkId ? 'fa-pen text-indigo-400' : 'fa-plus text-emerald-400'} mr-2`}></i>
              {editingLinkId ? 'Ubah Link' : 'Tambah Link Baru'}
            </h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Judul / Nama</label>
                  <input required type="text" value={newLink.title} onChange={e=>setNewLink({...newLink, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-emerald-500 outline-none" placeholder="Contoh: GitHub" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Kategori</label>
                  <input required type="text" value={newLink.category} onChange={e=>setNewLink({...newLink, category: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-emerald-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">URL (beserta https://)</label>
                <input required type="url" value={newLink.url} onChange={e=>setNewLink({...newLink, url: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-emerald-500 outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Pilih Ikon</label>
                <div className="grid grid-cols-6 gap-2">
                  {availableIcons.map(icon => (
                    <button key={icon} type="button" onClick={() => setNewLink({...newLink, icon})} className={`h-10 rounded-lg flex items-center justify-center transition border ${newLink.icon === icon ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'}`}>
                      <i className={icon}></i>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Pilih Warna Aksen</label>
                <div className="flex gap-3">
                  {availableColors.map(color => (
                    <button key={color} type="button" onClick={() => setNewLink({...newLink, color})} className={`w-6 h-6 rounded-full bg-${color}-500 transition-transform ${newLink.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : 'opacity-50 hover:opacity-100'}`}></button>
                  ))}
                </div>
              </div>
              <button type="submit" className={`w-full py-2.5 mt-2 text-white font-medium rounded-xl transition shadow-lg ${editingLinkId ? 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}`}>
                {editingLinkId ? 'Simpan Perubahan' : 'Simpan Link'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Logout Confirm */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.15s' }}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <h2 className="text-lg font-bold text-white mb-2"><i className="fa-solid fa-power-off text-rose-400 mr-2"></i>Konfirmasi Keluar</h2>
            <p className="text-sm text-zinc-400 mb-6">Apakah Anda yakin ingin keluar dari sistem?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 py-2.5 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition">Batal</button>
              <button onClick={() => supabase.auth.signOut()} className="flex-1 py-2.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition shadow-[0_0_15px_rgba(244,63,94,0.3)]">Keluar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!session) return <LoginView />
  return <DashboardView session={session} />
}

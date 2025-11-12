import React, { useState, useCallback, useMemo } from 'react';
import { User, Product, ProfileName, Theme } from './types';
import { PROFILES, PREFERENCES_OPTIONS, PROFILE_TAGS_OPTIONS, MOCK_PRODUCTS, MOCK_USERS } from './constants';
import { MenuIcon, SearchIcon, CloseIcon, GoogleIcon, FacebookIcon, UserIcon, ArrowLeftIcon } from './components/Icons';

type View = 'login' | 'register' | 'home' | 'profile';

// --- HELPER COMPONENTS ---

const Logo = ({ className }: { className?: string }) => (
    <div className={`flex items-center select-none ${className}`}>
        <span className="text-3xl md:text-4xl font-bold text-slate-700">TeCuido</span>
        <div className="relative w-7 h-7 md:w-8 md:h-8 ml-0">
          <div style={{backgroundColor: '#7DBA61'}} className="absolute top-1/2 left-0 w-full h-[0.7rem] -translate-y-1/2 rounded-full transform rotate-90"></div>
          <div style={{backgroundColor: '#F7A334'}} className="absolute top-1/2 left-0 w-full h-[0.7rem] -translate-y-1/2 rounded-full"></div>
        </div>
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      {...props} 
      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-shadow" 
    />
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'social';
    theme?: Theme;
}
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', theme, className, ...props }) => {
    const baseClasses = "w-full py-3 px-4 font-semibold rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-102 duration-300 ease-in-out flex items-center justify-center gap-3";
    
    const themeClasses = useMemo(() => {
      if (!theme) return { primary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500', secondary: `bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500` };
      return {
          primary: `bg-${theme.primary}-600 text-white hover:bg-${theme.primary}-700 focus:ring-${theme.primary}-500`,
          secondary: `bg-white text-${theme.primary}-600 border border-${theme.primary}-300 hover:bg-${theme.primary}-50 focus:ring-${theme.primary}-500`
      };
    }, [theme]);

    const variantClasses = {
        primary: themeClasses.primary,
        secondary: themeClasses.secondary,
        social: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400"
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

interface ProductCardProps {
    product: Product;
    theme: Theme;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, theme }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group">
        <div className="overflow-hidden">
            <img className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="p-3 flex flex-col flex-grow">
            <h3 className={`font-semibold text-sm text-slate-800 truncate flex-grow`}>{product.name}</h3>
            <div className="flex items-baseline mt-2">
                <p className={`text-lg font-bold text-${theme.primary}-600`}>S/.{product.price.toFixed(2)}</p>
                {product.originalPrice && (
                    <p className="ml-2 text-xs text-gray-500 line-through">S/.{product.originalPrice.toFixed(2)}</p>
                )}
            </div>
        </div>
    </div>
);

// --- SCREENS ---

const LoginScreen = ({ onLogin, onSwitchToRegister }: { onLogin: (user: User) => void; onSwitchToRegister: () => void; }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        setError('');
        const foundUser = MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
            onLogin(foundUser);
        } else {
            setError('Usuario no encontrado. Intenta con un correo de prueba.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl">
                <Logo className="mx-auto mb-8 justify-center" />
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">TeCuido+</h2>
                <div className="space-y-4">
                    <Input label="Usuario y/o e-mail" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g., beauty@tecuidomas.com" />
                    <Input label="Contraseña" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {error && <p className="text-sm text-red-600 pt-1">{error}</p>}
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-800 text-right block">¿Olvidó su contraseña?</a>
                </div>
                <div className="mt-6 space-y-4">
                    <Button onClick={handleLogin}>Iniciar Sesión</Button>
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase">O</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="social"><GoogleIcon />Google</Button>
                        <Button variant="social"><FacebookIcon />Facebook</Button>
                    </div>
                </div>
                <p className="mt-8 text-center text-sm text-gray-600">
                    <button onClick={onSwitchToRegister} className="font-semibold text-slate-600 hover:text-slate-800">Crear Nueva cuenta</button>
                </p>
            </div>
        </div>
    );
};

const RegisterScreen = ({ onRegisterComplete }: { onRegisterComplete: (user: User) => void; }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', gender: '', phone: '',
        preferences: new Set<string>(),
        profileTags: new Set<string>(),
        terms: false, promotions: false,
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleToggleSet = (key: 'preferences' | 'profileTags', value: string) => {
        setFormData(prev => {
            const newSet = new Set(prev[key]);
            if (newSet.has(value)) newSet.delete(value);
            else newSet.add(value);
            return { ...prev, [key]: newSet };
        });
    };
    
    const handleSubmit = () => {
        const profileKeys = Object.values(ProfileName);
        const randomProfile = profileKeys[Math.floor(Math.random() * profileKeys.length)];
        onRegisterComplete({
            id: `user-${Date.now()}`,
            firstName: formData.firstName || 'Nuevo',
            lastName: formData.lastName || 'Usuario',
            email: `${(formData.firstName || 'nuevo').toLowerCase()}@tecuidomas.com`,
            profileName: randomProfile,
            preferences: Array.from(formData.preferences),
            profileTags: Array.from(formData.profileTags),
        });
    }

    const StepIndicator = () => (
        <div className="flex justify-center items-center space-x-2 my-6">
            {[1, 2, 3].map(s => (
                <div key={s} className={`w-10 h-2 rounded-full transition-colors duration-300 ${step >= s ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
            ))}
        </div>
    );
    
    const renderStep = () => {
        switch (step) {
            case 1: return (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Registra tus datos:</h3>
                    <Input label="Nombres" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    <Input label="Apellidos" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    <Input label="Fecha Nacimiento" type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                    <Input label="Genero" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
                    <Input label="Celular" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
            );
            case 2: return (
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Elige tus preferencias:</h3>
                    <div className="flex flex-wrap gap-3">
                        {PREFERENCES_OPTIONS.map(pref => (
                            <button key={pref} onClick={() => handleToggleSet('preferences', pref)} className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ${formData.preferences.has(pref) ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}>
                                {pref}
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 3: return (
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Describe tu perfil:</h3>
                    <div className="flex flex-wrap gap-3">
                        {PROFILE_TAGS_OPTIONS.map(tag => (
                            <button key={tag} onClick={() => handleToggleSet('profileTags', tag)} className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ${formData.profileTags.has(tag) ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 space-y-3">
                        <h4 className="font-semibold text-slate-800">Términos y Condiciones</h4>
                        <label className="flex items-center space-x-3"><input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500" checked={formData.terms} onChange={e => setFormData({...formData, terms: e.target.checked})} /><span className="text-gray-700 text-sm">Autorización de uso de datos personales.</span></label>
                        <label className="flex items-center space-x-3"><input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500" checked={formData.promotions} onChange={e => setFormData({...formData, promotions: e.target.checked})}/><span className="text-gray-700 text-sm">Autorización de comunicación de promociones.</span></label>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl">
                <Logo className="mx-auto mb-2 justify-center" />
                <StepIndicator />
                <div className="min-h-[26rem]">{renderStep()}</div>
                <div className="mt-6 flex gap-4">
                    {step > 1 && <Button onClick={handleBack} variant="secondary">Atrás</Button>}
                    {step < 3 && <Button onClick={handleNext}>Siguiente</Button>}
                    {step === 3 && <Button onClick={handleSubmit} disabled={!formData.terms}>Finalizar Registro</Button>}
                </div>
            </div>
        </div>
    );
};

const HomeScreen = ({ user, onLogout, onSwitchToProfile }: { user: User, onLogout: () => void; onSwitchToProfile: () => void; }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const profile = PROFILES[user.profileName];
    const { theme } = profile;

    const filteredProducts = useMemo(() => {
        const relevantProducts = MOCK_PRODUCTS.filter(p => profile.subcategories.includes(p.category));
        if (activeCategory === 'Todos') return relevantProducts;
        return relevantProducts.filter(p => p.category === activeCategory);
    }, [activeCategory, profile.subcategories]);

    return (
        <div className={`min-h-screen ${theme.font} bg-gray-50`}>
             <div 
                className="fixed inset-0 bg-cover bg-center -z-10 transition-all duration-500" 
                style={{ backgroundImage: `url(${profile.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
            </div>
            
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <Logo />
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full hover:bg-gray-100"><CloseIcon className="w-6 h-6 text-gray-600" /></button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-1">
                        {['Por perfil', 'Según tu historial', 'Tendencias', 'En Oferta', 'Categorías'].map(item => (
                            <li key={item}><a href="#" className={`block px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-${theme.primary}-50 hover:text-${theme.primary}-800`}>{item}</a></li>
                        ))}
                        <li className="pt-4 border-t border-gray-200 mt-4"><button onClick={onSwitchToProfile} className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-${theme.primary}-50 hover:text-${theme.primary}-800`}><UserIcon className="w-5 h-5"/>Mi Perfil</button></li>
                        <li className="pt-2"><button onClick={onLogout} className={`w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-red-50 hover:text-red-800`}>Cerrar Sesión</button></li>
                    </ul>
                </nav>
            </div>

            <main className="p-4 md:p-6 max-w-4xl mx-auto relative z-10">
                <header className="flex justify-between items-center mb-6">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2"><MenuIcon className={`w-8 h-8 text-${theme.primary}-600`} /></button>
                    <h1 className={`text-xl font-bold text-slate-800`}>Hola, {user.firstName}</h1>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-${theme.accent}-200`}><UserIcon className={`w-6 h-6 text-${theme.primary}-700`}/></div>
                </header>

                <div className="relative mb-6">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2"><SearchIcon className="w-6 h-6 text-gray-400" /></span>
                    <input type="search" placeholder="Buscador..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-shadow"/>
                </div>
                
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="flex space-x-3">
                    {['Todos', ...profile.subcategories].map((subcat) => (
                        <button key={subcat} onClick={() => setActiveCategory(subcat)} className={`flex-shrink-0 py-2 px-4 text-center text-sm font-semibold rounded-full shadow-sm transition-all duration-200 ${activeCategory === subcat ? `bg-${theme.primary}-600 text-white` : `bg-white/80 backdrop-blur-sm text-slate-700 border border-gray-300 hover:bg-gray-100/80`}`}>
                            {subcat}
                        </button>
                    ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h2 className={`text-2xl font-bold text-slate-800 mb-4`}>Productos Recomendados</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {filteredProducts.map(product => <ProductCard key={product.id} product={product} theme={theme} />)}
                        </div>
                    ) : (
                         <p className={`text-center text-slate-500 mt-8`}>No se encontraron productos en esta categoría.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

const ProfileScreen = ({ user, onBack }: { user: User, onBack: () => void; }) => {
    const profile = PROFILES[user.profileName];
    const { theme } = profile;

    const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 className={`text-lg font-bold text-${theme.primary}-700 border-b-2 border-${theme.accent}-300 pb-2 mb-4`}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <header className="max-w-4xl mx-auto flex items-center mb-6">
                <button onClick={onBack} className={`p-3 mr-4 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors`}>
                    <ArrowLeftIcon className="w-6 h-6 text-slate-700" />
                </button>
                <h1 className="text-3xl font-bold text-slate-800">Mi Perfil</h1>
            </header>
            <div className="max-w-4xl mx-auto space-y-6">
                <InfoCard title="Datos Personales">
                    <div className="space-y-2 text-slate-600">
                        <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Perfil TeCuido+:</strong> <span className={`font-semibold text-${theme.primary}-800`}>{user.profileName}</span></p>
                    </div>
                </InfoCard>
                <InfoCard title="Mis Preferencias">
                    <div className="flex flex-wrap gap-3">
                        {user.preferences.length > 0 ? user.preferences.map(pref => (
                            <span key={pref} className={`px-4 py-2 text-sm font-medium rounded-full bg-${theme.primary}-100 text-${theme.primary}-800`}>{pref}</span>
                        )) : <p className="text-slate-500">No has seleccionado preferencias.</p>}
                    </div>
                </InfoCard>
                <InfoCard title="Mis Etiquetas de Perfil">
                    <div className="flex flex-wrap gap-3">
                        {user.profileTags.length > 0 ? user.profileTags.map(tag => (
                             <span key={tag} className={`px-4 py-2 text-sm font-medium rounded-full bg-${theme.accent}-200 text-${theme.primary}-800`}>{tag}</span>
                        )) : <p className="text-slate-500">No has seleccionado etiquetas.</p>}
                    </div>
                </InfoCard>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App = () => {
    const [view, setView] = useState<View>('login');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleLogin = useCallback((user: User) => { setCurrentUser(user); setView('home'); }, []);
    const handleRegisterComplete = useCallback((user: User) => { setCurrentUser(user); setView('home'); }, []);
    const handleLogout = useCallback(() => { setCurrentUser(null); setView('login'); }, []);
    const handleSwitchToRegister = useCallback(() => { setView('register'); }, []);
    const handleSwitchToProfile = useCallback(() => { setView('profile'); }, []);
    const handleBackToHome = useCallback(() => { setView('home'); }, []);
    
    const renderView = () => {
        switch (view) {
            case 'register': return <RegisterScreen onRegisterComplete={handleRegisterComplete} />;
            case 'home': return currentUser ? <HomeScreen user={currentUser} onLogout={handleLogout} onSwitchToProfile={handleSwitchToProfile} /> : <LoginScreen onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />;
            case 'profile': return currentUser ? <ProfileScreen user={currentUser} onBack={handleBackToHome} /> : <LoginScreen onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />;
            case 'login': default: return <LoginScreen onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />;
        }
    };
    
    return <>{renderView()}</>;
};

export default App;

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlanType, UserData } from '../types';

export const Profile: React.FC = () => {
  const { user, t, updateUser, lastError, clearLastError } = useApp();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>(user || {});
  const [billingDraft, setBillingDraft] = useState<NonNullable<UserData['billing']>>(user?.billing || {});
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<PlanType | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingBilling, setIsSavingBilling] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFormData(user);
    setBillingDraft(user.billing || {});
  }, [user]);

  if (!user) return <div className="p-20 text-center">Please login</div>;

  const setSuccess = (message: string) => {
    clearLastError();
    setStatusMessage(message);
  };

  const saveProfileData = async () => {
    try {
      setIsSavingProfile(true);
      await updateUser({ name: formData.name?.trim() || user.name });
      setEditing(false);
      setSuccess('Perfil guardado correctamente.');
    } catch {
      setStatusMessage('');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const saveBillingData = async () => {
    try {
      setIsSavingBilling(true);
      await updateUser({ billing: billingDraft });
      setSuccess('Datos de facturación guardados.');
    } catch {
      setStatusMessage('');
    } finally {
      setIsSavingBilling(false);
    }
  };

  const handlePlanChange = async (newPlan: PlanType) => {
    try {
      if (newPlan === 'free') {
        if (window.confirm("¿Seguro que quieres bajar al plan Gratis? Se eliminarán tus datos de facturación.")) {
          await updateUser({ plan: newPlan, billing: undefined, consent: false, consentDate: undefined });
          setBillingDraft({});
          setSuccess('Plan actualizado a Gratis.');
        }
      } else {
        setPendingPlan(newPlan);
        if (!user.consent) {
          setConsentAccepted(false);
          setShowConsentModal(true);
        } else {
          await updateUser({ plan: newPlan });
          setSuccess('Plan actualizado correctamente.');
        }
      }
    } catch {
      setStatusMessage('');
    }
  };

  const confirmConsent = async () => {
    setShowConsentModal(false);
    if (pendingPlan) {
      try {
        await updateUser({ 
          plan: pendingPlan, 
          consent: true, 
          consentDate: new Date().toISOString() 
        });
        setSuccess('Consentimiento confirmado y plan actualizado.');
      } catch {
        setStatusMessage('');
      }
    }
  };

  const withdrawConsent = async () => {
    if (window.confirm("Al retirar el consentimiento, se borrarán tus datos bancarios y volverás al plan Gratis. ¿Continuar?")) {
      try {
        await updateUser({ 
          plan: 'free', 
          consent: false, 
          consentDate: undefined,
          billing: undefined
        });
        setBillingDraft({});
        setSuccess('Consentimiento retirado y datos eliminados.');
      } catch {
        setStatusMessage('');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {lastError && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
          <span>{lastError}</span>
          <button className="font-bold" onClick={clearLastError}>×</button>
        </div>
      )}
      {statusMessage && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
          <span>{statusMessage}</span>
          <button className="font-bold" onClick={() => setStatusMessage('')}>×</button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">{t.profile.title}</h1>
        {user.plan !== 'free' && (
           <span className="bg-modai-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
             PLAN {user.plan}
           </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Main Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-gray-500">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            
            <button 
              onClick={() => setEditing(!editing)}
              className="w-full border border-gray-300 dark:border-gray-600 py-2 rounded-lg text-sm font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {editing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t dark:border-gray-700">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Account Settings</h3>
            {user.consent && (
                <button onClick={withdrawConsent} className="text-red-500 text-xs hover:underline">
                  Retirar Consentimiento y Borrar Datos
                </button>
            )}
          </div>
        </div>

        {/* Right Column: Details & Plan Config */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Personal Info Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
             <h3 className="text-lg font-bold mb-4 dark:text-white">Información Personal</h3>
             <div className="grid grid-cols-1 gap-4">
               <div>
                 <label className="block text-xs font-bold text-gray-500 mb-1">{t.auth.name}</label>
                 <input 
                   type="text" 
                   disabled={!editing}
                   value={editing ? formData.name : user.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-2 dark:text-white"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 mb-1">Email (Read Only)</label>
                 <input type="text" disabled value={user.email} className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded p-2 text-gray-500" />
               </div>
               {editing && (
                 <button 
                   disabled={isSavingProfile}
                   onClick={() => void saveProfileData()}
                   className="bg-modai-blue text-white font-bold py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSavingProfile ? 'Guardando...' : t.profile.save}
                 </button>
               )}
             </div>
          </div>

          {/* Plan Selection */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Suscripción</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(['free', 'premium', 'business'] as PlanType[]).map(p => (
                <button
                  key={p}
                  onClick={() => handlePlanChange(p)}
                  className={`py-2 text-sm font-bold rounded border ${user.plan === p ? 'border-modai-blue bg-blue-50 text-modai-blue' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                >
                  {t.plans[p].split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Dynamic Billing Fields based on Plan */}
            {user.plan !== 'free' && (
              <div className="animate-fade-in">
                <h4 className="text-sm font-bold text-modai-orange mb-3 border-b pb-2">
                  {user.plan === 'premium' ? t.profile.banking : t.profile.business}
                </h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {user.plan === 'business' && (
                    <>
                      <input placeholder="Nombre Fiscal" className="input-field" onChange={(e) => setBillingDraft(prev => ({ ...prev, fiscalName: e.target.value }))} value={billingDraft.fiscalName || ''} />
                      <input placeholder="CIF" className="input-field" onChange={(e) => setBillingDraft(prev => ({ ...prev, cif: e.target.value }))} value={billingDraft.cif || ''} />
                      <input placeholder="Dirección Fiscal" className="input-field" onChange={(e) => setBillingDraft(prev => ({ ...prev, fiscalAddress: e.target.value }))} value={billingDraft.fiscalAddress || ''} />
                    </>
                  )}
                  <input placeholder="Cuenta Bancaria (IBAN)" className="input-field" onChange={(e) => setBillingDraft(prev => ({ ...prev, accountNumber: e.target.value }))} value={billingDraft.accountNumber || ''} />
                  <button
                    onClick={() => void saveBillingData()}
                    disabled={isSavingBilling}
                    className="bg-modai-blue text-white font-bold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSavingBilling ? 'Guardando...' : 'Guardar datos de facturación'}
                  </button>
                  <p className="text-xs text-gray-400 mt-2"><i className="fas fa-lock mr-1"></i> Datos protegidos y encriptados en MongoDB.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 max-w-lg w-full rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
               <i className="fas fa-shield-alt text-5xl text-modai-blue mb-4"></i>
               <h2 className="text-2xl font-bold dark:text-white">{t.consent.title}</h2>
            </div>
            <div className="prose dark:prose-invert text-sm mb-6 text-gray-600 dark:text-gray-300 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded">
              {t.consent.text}
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" id="consentCheck" className="w-5 h-5 text-modai-blue" checked={consentAccepted} onChange={(e) => setConsentAccepted(e.target.checked)} />
              <label htmlFor="consentCheck" className="ml-3 text-sm font-bold dark:text-white">{t.consent.checkbox}</label>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setShowConsentModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">{t.consent.cancel}</button>
              <button disabled={!consentAccepted} onClick={confirmConsent} className="flex-1 py-3 bg-modai-blue text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:bg-blue-600">
                {t.consent.accept}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .input-field {
            width: 100%;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
        }
        .dark .input-field {
            background: #111827;
            border-color: #374151;
            color: white;
        }
      `}</style>
    </div>
  );
};
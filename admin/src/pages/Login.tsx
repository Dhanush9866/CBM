import { FormEvent, useState } from 'react';
import { requestOtp, verifyOtp, loginWithPassword } from '@/services/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('password');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    console.log('================================================');
    console.log('🔐 Admin Login - Requesting OTP');
    console.log('================================================');
    console.log('  API Endpoint: /api/admin/auth/request-otp');
    console.log('  Timestamp:', new Date().toISOString());
    
    try {
      const res = await requestOtp();
      console.log('✅ OTP Request Response:', res);
      if (res.success) {
        setStep('verify');
        setMessage('OTP sent to your email. Please check your inbox.');
        console.log('✅ OTP sent successfully');
      } else {
        console.error('❌ OTP Request Failed:', res.message);
        setMessage(res.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      console.error('❌ OTP Request Error:', err);
      console.error('  Error Message:', err?.message);
      console.error('  Response Status:', err?.response?.status);
      console.error('  Response Data:', err?.response?.data);
      console.error('  Request URL:', err?.config?.url);
      console.error('  Base URL:', err?.config?.baseURL);
      setMessage(err?.response?.data?.message || err?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
      console.log('================================================');
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await verifyOtp(code);
      if (res.success && res.data?.token) {
        localStorage.setItem('admin_token', res.data.token);
        const to = location.state?.from?.pathname || '/careers';
        navigate(to, { replace: true });
      } else {
        setMessage(res.message || 'Invalid code');
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    console.log('================================================');
    console.log('🔐 Admin Password Login');
    console.log('================================================');
    console.log('  Email:', email);
    console.log('  Timestamp:', new Date().toISOString());
    
    try {
      const res = await loginWithPassword(email, password);
      console.log('✅ Login Response:', res);
      if (res.success && res.data?.token) {
        localStorage.setItem('admin_token', res.data.token);
        console.log('✅ Login successful, redirecting...');
        const to = location.state?.from?.pathname || '/careers';
        navigate(to, { replace: true });
      } else {
        console.error('❌ Login Failed:', res.message);
        setMessage(res.message || 'Invalid email or password');
      }
    } catch (err: any) {
      console.error('❌ Login Error:', err);
      console.error('  Error Message:', err?.message);
      console.error('  Response Status:', err?.response?.status);
      console.error('  Response Data:', err?.response?.data);
      setMessage(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
      console.log('================================================');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>CBM Admin Login</h1>
      
      {/* Login Method Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid #e5e7eb', paddingBottom: 12 }}>
        <button
          type="button"
          onClick={() => {
            setLoginMethod('password');
            setStep('request');
            setMessage(null);
          }}
          style={{
            flex: 1,
            padding: 8,
            background: loginMethod === 'password' ? '#111827' : 'transparent',
            color: loginMethod === 'password' ? 'white' : '#111827',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: loginMethod === 'password' ? 600 : 400
          }}
        >
          Email & Password
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMethod('otp');
            setStep('request');
            setMessage(null);
          }}
          style={{
            flex: 1,
            padding: 8,
            background: loginMethod === 'otp' ? '#111827' : 'transparent',
            color: loginMethod === 'otp' ? 'white' : '#111827',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: loginMethod === 'otp' ? 600 : 400
          }}
        >
          OTP Login
        </button>
      </div>

      {message && (
        <div style={{ 
          marginBottom: 12, 
          padding: 10, 
          borderRadius: 6,
          background: message.includes('success') || message.includes('sent') ? '#d1fae5' : '#fee2e2',
          color: message.includes('success') || message.includes('sent') ? '#065f46' : '#991b1b'
        }}>
          {message}
        </div>
      )}

      {/* Password Login Form */}
      {loginMethod === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@cbm.com"
            style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 12 }}
          />
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 12 }}
          />
          <button 
            disabled={loading} 
            type="submit" 
            style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {/* OTP Login Form */}
      {loginMethod === 'otp' && (
        <>
          {step === 'request' ? (
            <form onSubmit={handleRequest}>
              <button disabled={loading} type="submit" style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Enter OTP</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="6-digit code"
                style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 12 }}
              />
              <button disabled={loading} type="submit" style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <button type="button" onClick={() => setStep('request')} style={{ width: '100%', padding: 10, background: 'transparent', color: '#111827', borderRadius: 6, marginTop: 8, border: '1px solid #d1d5db' }}>
                Resend OTP
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}


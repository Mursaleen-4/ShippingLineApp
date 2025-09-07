import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './lib/auth';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Vessels = React.lazy(() => import('./pages/Vessels'));
const VesselDetail = React.lazy(() => import('./pages/VesselDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const EServices = React.lazy(() => import('./pages/EServices'));
const EServiceDetail = React.lazy(() => import('./pages/EServiceDetail'));
const Tracking = React.lazy(() => import('./pages/Tracking'));
const VesselDataEntry = React.lazy(() => import('./pages/VesselDataEntry'));

// Loading component for Suspense
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" message="Loading page..." />
  </div>
);

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Animated route wrapper
const AnimatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="w-full"
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="App min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              gutter={8}
              containerClassName="z-50"
              toastOptions={{
                duration: 4000,
                className: 'bg-white border border-gray-200 shadow-lg rounded-lg',
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                },
              }}
            />

            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait" initial={false}>
                <Routes>
                  {/* Public routes */}
                  <Route
                    path="/"
                    element={
                      <AnimatedRoute>
                        <Home />
                      </AnimatedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={(
                      <AnimatedRoute>
                        <Login />
                      </AnimatedRoute>
                    )}
                  />
                  <Route
                    path="/about"
                    element={(
                      <Layout>
                        <AnimatedRoute>
                          <About />
                        </AnimatedRoute>
                      </Layout>
                    )}
                  />
                  <Route
                    path="/contact"
                    element={(
                      <Layout>
                        <AnimatedRoute>
                          <Contact />
                        </AnimatedRoute>
                      </Layout>
                    )}
                  />
                  <Route
                    path="/eservices"
                    element={(
                      <Layout>
                        <AnimatedRoute>
                          <EServices />
                        </AnimatedRoute>
                      </Layout>
                    )}
                  />
                  <Route
                    path="/eservices/:id"
                    element={(
                      <Layout>
                        <AnimatedRoute>
                          <EServiceDetail />
                        </AnimatedRoute>
                      </Layout>
                    )}
                  />
                  <Route
                    path="/tracking"
                    element={(
                      <Layout>
                        <AnimatedRoute>
                          <Tracking />
                        </AnimatedRoute>
                      </Layout>
                    )}
                  />

                  {/* Protected routes with layout */}
                  <Route
                    path="/dashboard"
                    element={
                      <Layout>
                        <AnimatedRoute>
                          <Dashboard />
                        </AnimatedRoute>
                      </Layout>
                    }
                  />
                  <Route
                    path="/vessels"
                    element={
                      <Layout>
                        <AnimatedRoute>
                          <Vessels />
                        </AnimatedRoute>
                      </Layout>
                    }
                  />
                  <Route
                    path="/vessels/:id"
                    element={
                      <Layout>
                        <AnimatedRoute>
                          <VesselDetail />
                        </AnimatedRoute>
                      </Layout>
                    }
                  />
                  <Route
                    path="/vessel-data-entry"
                    element={
                      <Layout>
                        <AnimatedRoute>
                          <VesselDataEntry />
                        </AnimatedRoute>
                      </Layout>
                    }
                  />

                  {/* Redirects */}
                  <Route path="/home" element={<Navigate to="/" replace />} />

                  {/* 404 fallback */}
                  <Route
                    path="*"
                    element={
                      <AnimatedRoute>
                        <NotFound />
                      </AnimatedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

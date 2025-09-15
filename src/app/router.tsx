import Dashboard from "@/features/Protected/Dashbaord";
import Extractor from "@/features/Protected/Extractor";
import SignIn from "@/features/SignIn";
import { supabaseClient } from "@/lib/supabase";
import { useAppDispatch } from "@/store";
import { setAuthSession } from "@/store/slices/auth.slice";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

const AppRouter = () => {
  const [session, setSession] = useState<Session>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        dispatch(setAuthSession(session));
      }
    });
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        dispatch(setAuthSession(session));
      } else {
        setSession(undefined);
        dispatch(setAuthSession(undefined));
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    // Authenticated Router
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/generate-niche" element={<Extractor />} />
      </Routes>
    );
  }
  return <SignIn />;
};

export default AppRouter;

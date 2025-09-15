import { useEffect } from "react";
import Wrapper from "../Wrapper";
import { supabaseClient } from "@/lib/supabase";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const { data } = await supabaseClient.rpc("skill_counts_per_day");

      console.log(data);
    })();
  }, []);
  return (
    <Wrapper>
      <p>Hello World</p>
    </Wrapper>
  );
};

export default Dashboard;

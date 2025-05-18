import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UsePremium = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: isPremiumUser } = useQuery({
    queryKey: [user?.email, "isPremiumUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premiumUsers?email=${user?.email}`);
      // console.log("premium user:", res.data?.premium);
      return res.data?.premium;
    },
  });
  return [isPremiumUser];
};

export default UsePremium;
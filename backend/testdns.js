import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.cluster0.ibpapbi.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);
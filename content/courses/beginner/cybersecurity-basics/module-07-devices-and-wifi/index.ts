import type { Module } from "@/content/types";
import { keepingDevicesSecure } from "./lesson-01-keeping-devices-secure";
import { howYourHomeNetworkWorks } from "./lesson-02-how-your-home-network-works";
import { httpsFirewallsAndPublicWifi } from "./lesson-03-https-firewalls-and-public-wifi";

export const module07DevicesAndWifi: Module = {
  slug: "devices-and-wifi",
  title: "Devices & Wi-Fi",
  lessons: [keepingDevicesSecure, howYourHomeNetworkWorks, httpsFirewallsAndPublicWifi],
};

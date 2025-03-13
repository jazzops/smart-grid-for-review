export const getCompanyStatusData = (companyId: string) => {
  const data = {
    "1": { // EnergiaPro S.A.
      deviceStatus: {
        activeDevices: 85,
        networkConnection: 92,
        signalQuality: 78
      },
      systemStatus: {
        cpuUsage: 45,
        memoryUsage: 60,
        networkLatency: 25
      }
    },
    "2": { // GreenTech Industries
      deviceStatus: {
        activeDevices: 95,
        networkConnection: 88,
        signalQuality: 82
      },
      systemStatus: {
        cpuUsage: 35,
        memoryUsage: 45,
        networkLatency: 15
      }
    },
    "3": { // EkoEnergia Plus
      deviceStatus: {
        activeDevices: 75,
        networkConnection: 95,
        signalQuality: 90
      },
      systemStatus: {
        cpuUsage: 55,
        memoryUsage: 70,
        networkLatency: 30
      }
    },
    "4": { // SmartPower Corp
      deviceStatus: {
        activeDevices: 88,
        networkConnection: 85,
        signalQuality: 75
      },
      systemStatus: {
        cpuUsage: 65,
        memoryUsage: 80,
        networkLatency: 40
      }
    },
    "5": { // FutureEnergy
      deviceStatus: {
        activeDevices: 92,
        networkConnection: 90,
        signalQuality: 85
      },
      systemStatus: {
        cpuUsage: 40,
        memoryUsage: 50,
        networkLatency: 20
      }
    }
  };
  
  return data[companyId as keyof typeof data] || data["1"];
};
export const laptopInputSchema = {
    system_type: "Laptop",
    schema_definition: {
        thermal: ["cpu_temperature", "gpu_temperature", "fan_speed"],
        battery: ["battery_health", "battery_cycles", "power_draw"],
        performance: ["cpu_usage", "ram_usage", "disk_io"],
        context: ["workload_type", "ambient_temperature"]
    },
    active: true
};

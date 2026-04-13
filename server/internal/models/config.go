package models

type SimulationConfig struct {
	NumberOfCoders            int    `json:"number_of_coders"`
	TimeToBurnout             int64  `json:"time_to_burnout"`
	TimeToCompile             int64  `json:"time_to_compile"`
	TimeToDebug               int64  `json:"time_to_debug"`
	TimeToRefactor            int64  `json:"time_to_refactor"`
	NumberOfCompilesRequired int    `json:"number_of_compiles_required"`
	DongleCooldown            int64  `json:"dongle_cooldown"`
	Scheduler                 string `json:"scheduler"`
}

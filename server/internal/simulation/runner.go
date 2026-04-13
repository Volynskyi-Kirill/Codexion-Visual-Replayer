package simulation

import (
	"context"
	"fmt"
	"io"
	"os/exec"
	"strconv"

	"github.com/kvolynsk/codexion-visualizer/server/internal/models"
)

type Runner struct {
	BinaryPath string
}

func NewRunner(binaryPath string) *Runner {
	return &Runner{BinaryPath: binaryPath}
}

func (r *Runner) Run(ctx context.Context, config models.SimulationConfig) (io.ReadCloser, *exec.Cmd, error) {
	args := []string{
		strconv.Itoa(config.NumberOfCoders),
		strconv.FormatInt(config.TimeToBurnout, 10),
		strconv.FormatInt(config.TimeToCompile, 10),
		strconv.FormatInt(config.TimeToDebug, 10),
		strconv.FormatInt(config.TimeToRefactor, 10),
		strconv.Itoa(config.NumberOfCompilesRequired),
		strconv.FormatInt(config.DongleCooldown, 10),
		config.Scheduler,
	}

	cmd := exec.CommandContext(ctx, r.BinaryPath, args...)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create stdout pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return nil, nil, fmt.Errorf("failed to start command: %w", err)
	}

	return stdout, cmd, nil
}

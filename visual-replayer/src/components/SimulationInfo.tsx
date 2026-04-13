import type { InitializeEvent } from '../utils/types';

interface SimulationInfoProps {
    metadata: InitializeEvent;
}

export const SimulationInfo: React.FC<SimulationInfoProps> = ({ metadata }) => {
    return (
        <footer className='simulation-info'>
            <div className='info-grid'>
                <div className='info-item'>
                    <div className='info-label'>Coders</div>
                    <div className='info-value'>{metadata.num_coders}</div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Dongles</div>
                    <div className='info-value'>{metadata.num_dongles}</div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Burnout Time</div>
                    <div className='info-value'>
                        {metadata.time_to_burnout}ms
                    </div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Compile Time</div>
                    <div className='info-value'>
                        {metadata.time_to_compile}ms
                    </div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Debug Time</div>
                    <div className='info-value'>{metadata.time_to_debug}ms</div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Refactor Time</div>
                    <div className='info-value'>
                        {metadata.time_to_refactor}ms
                    </div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Compiles Required</div>
                    <div className='info-value'>
                        {metadata.num_compiles_required}
                    </div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Dongle Cooldown</div>
                    <div className='info-value'>
                        {metadata.dongle_cooldown}ms
                    </div>
                </div>
                <div className='info-item'>
                    <div className='info-label'>Scheduler</div>
                    <div className='info-value'>{metadata.scheduler}</div>
                </div>
            </div>
        </footer>
    );
};

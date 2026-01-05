import {useDispatch, useSelector} from 'react-redux';
import {setUnit} from '../slices/settingsSlice';

const UnitSwitcher = () => {
    const dispatch = useDispatch();
    const unit = useSelector(state => state.settings.unit);

    return (
        <div>
            {['C', 'F', 'K'].map(u => (
                <button
                    key={u}
                    className={unit === u ? 'active' : ''}
                    onClick={() => dispatch(setUnit(u))}
                >
                    °{u}
                </button>
            ))}
        </div>
    );
};

export default UnitSwitcher;

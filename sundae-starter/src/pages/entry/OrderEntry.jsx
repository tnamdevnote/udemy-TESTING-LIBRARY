import { formatCurrency } from '../../utilities';
import { useOrderDetailsContext } from '../context/OrderDetailsContext';
import Options from './Options';

function OrderEntry() {
  const { totals } = useOrderDetailsContext();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals['scoops'] + totals['toppings'])}</h2>
    </div>
  );
}

export default OrderEntry;

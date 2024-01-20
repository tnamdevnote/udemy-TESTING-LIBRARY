import { createContext, useContext, useMemo, useState } from 'react';
import { pricePerItem } from '../../constants';

const OrderDetailsContext = createContext();

export const useOrderDetailsContext = () => {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error('useOrderDetailsContext must be called from within a OrderDetails Provider.');
  }

  return context;
};

export const OrderDetailsProvider = ({ children, ...rest }) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  }

  // utility function to derive totals from optionCounts
  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);
    const total = countsArray.reduce((total, value) => total + value, 0);

    return total * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const memoizedProviderValue = useMemo(
    () => ({
      optionCounts,
      totals,
      updateItemCount,
      resetOrder,
    }),
    [optionCounts, totals, updateItemCount, resetOrder]
  );

  return (
    <OrderDetailsContext.Provider value={memoizedProviderValue} {...rest}>
      {children}
    </OrderDetailsContext.Provider>
  );
};

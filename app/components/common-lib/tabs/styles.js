/**
 * Created by iross on 1/4/2016.
 */

// temporarily adding these here. Will most likely move to css
export let tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

export let activeTab = {
  ...tab,
  borderBottomColor: '#000'
};

export let disabledTab = {
  ...tab,
  opacity: 0.25,
  cursor: 'default'
};

export let tabPanels = {
  padding: 10
};



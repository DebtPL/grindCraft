
var equippedItem = null;
const itemContainer = document.getElementById('inventory-section');
const equippetdText = document.getElementById('inventory-tb-EquippedItem');
const savedState =   localStorage.getItem("savedState");


let items = [
    {
      name: 'Basic Rod',
      amount: 1,
      buyable: true,
      price: 100,
      unlocked: 1,
      singlePurchaseBought: false,
      actions: [
        { label: 'Equip', onClick: equipRod, onClick: itemEquip, isEquipped: false }
      ]
    },
    {
      name: 'Advanced Rod',
      amount: 1,
      buyable: true,
      price: 500,
      unlocked: 0,
      singlePurchaseBought: false,
      actions: [
        { label: 'Equip', onClick: equipRod, onClick: itemEquip, isEquipped: false }
      ]
    },
    {
       name: 'Master Rod',
       amount: 1,
       buyable: true,
       price: 1000,
       unlocked: 0,
       singlePurchaseBought: false,
       actions: [
        { label: 'Equip', onClick: equipRod, isEquipped: false }
       ]
    },
    {
       name: 'Tin Can',
       amount: 1,
       buyable: false,
       singlePurchaseBought: false,
       unlocked: 1,
       price: 1000,
       actions: [
        { label: 'Equip', onClick: equipCan, isEquipped: false }
       ]
    },
    {
      name: 'Shoe',
      amount: 0,
    },
    {
      name: 'Salmon',
      amount: 0,
      sellable: true,
      price: 10,
    },
    {
    name: 'Trout',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Bass',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Swordfish',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Tuna',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Paper Clip',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Flint',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Paper',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Scraps',
    amount: 0,
    sellable: true,
    price: 10,
    },
    {
    name: 'Rotten food',
    amount: 0,
    },
    {
    name: 'Broken Glass',
    amount: 0,
    buyable: false,
    }
  ];

function itemEquip(item) {
  items.forEach(i => i.isEquipped = false);
  item.isEquipped = true;
  localStorage.setItem("savedEquippedItem", JSON.stringify(item));    
  equippedItem = item;
  equippetdText.innerHTML = `${item.name}`
  console.log(`${item.name} is now equipped.`);
  if (savedState === "pond") {
  updateCastButton()
  }
  if (savedState === "home") {
  updateTinCanButton()
  }
}

function equipCan() {
  console.log("ee")
}

function equipRod(item) {
    if (item.name === 'Basic Rod') {
        selectedRod = fishingRods[0];
        console.log(selectedRod)
    } else if (item.name === 'Advanced Rod') {
        selectedRod = fishingRods[1];
        console.log(selectedRod)
    } else if (item.name === 'Master Rod') {
        selectedRod = fishingRods[2];
        console.log(selectedRod)
    }
    
}

function updateTinCanButton() {
  const begButton = document.querySelector('#beg');
  console.log(equippedItem.name)
  if ((equippedItem === null)) {
  }
  else if (["Tin Can"].includes(equippedItem.name)) {
    console.log("eeee")
    begButton.style.display = "inline";
  }
  else if (!["Tin Can"].includes(equippedItem.name)) {
    begButton.style.display = 'none';
  }
}

function updateCastButton() {
  const castButton = document.querySelector('#castRod');
  console.log(equippedItem.name)
  if ((equippedItem === null)) {
  }
  else if (!["Basic Rod", "Advanced Rod", "Master Rod"].includes(equippedItem.name)) {
    castButton.style.display = 'none';
  }
  else if (["Basic Rod", "Advanced Rod", "Master Rod"].includes(equippedItem.name)) {
      castButton.style.display = 'inline-block';
      castButton.textContent = `Cast ${equippedItem.name}?`;
  } 
}

function addItem(item, itemAmount) {
    const name = items.find(i => i.name === item);
    if (name) { 
    name.amount += itemAmount
    console.log(item.amount)
    console.log(item)
    updateInventory()
    }
}


function updateInventory() {
    itemContainer.innerHTML = '';
  
    items.forEach((inventoryItem) => {
      if (inventoryItem.amount >= 1) {
        const itemDiv = document.createElement('div');
        itemDiv.classList = 'logtext';
        itemDiv.style.position = 'static';
        itemDiv.style.display = 'flex';
        itemDiv.style.width = '99%';
        itemDiv.style.height = 'auto';
        itemDiv.style.background = 'none';
        itemDiv.style.border = 'solid 2px black';
        itemDiv.style.fontSize = '16px';
        itemDiv.style.color = 'white';
        itemDiv.style.textAlign = 'center';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.marginBottom = '5px';
        
        const infoSpan = document.createElement('span');
        infoSpan.style.marginLeft = '10px';
        infoSpan.innerText = `${inventoryItem.name}: ${inventoryItem.amount}`;
        itemDiv.appendChild(infoSpan);
  
        if (inventoryItem.actions && inventoryItem.actions.length > 0) {
          const actionContainer = document.createElement('div');
          actionContainer.style.display = 'flex';
          actionContainer.style.gap = '10px';
          actionContainer.style.marginRight = '10px';
  
          inventoryItem.actions.forEach(action => {
            const btn = document.createElement('button');
            btn.innerText = action.label;
            btn.style.cursor = 'pointer';
            btn.style.padding = '2px 5px';
            btn.style.background = 'none';
            btn.style.color = 'green';
            btn.addEventListener('click', () => action.onClick(inventoryItem));
            actionContainer.appendChild(btn);
          });
  
          itemDiv.appendChild(actionContainer);
        }
  
        itemContainer.appendChild(itemDiv);

        
      }
        const savedItems = JSON.stringify(items);   
        localStorage.setItem("savedItems", savedItems);    
    });

  }

function addActions() {
    items.forEach(item => {
        switch (item.name) {
            case 'Basic Rod':
            item.actions = [
              { label: 'Equip', onClick: () => { equipRod(items[0]); itemEquip(items[0]); }}
            ];
            break;
            case 'Advanced Rod':
            item.actions = [
              { label: 'Equip', onClick: () => { equipRod(items[1]); itemEquip(items[1]); }}
            ];
            break;
            case 'Master Rod':
            item.actions = [
              { label: 'Equip', onClick: () => { equipRod(items[2]); itemEquip(items[2]); }}
            ];
            break;
            case 'Tin Can':
            item.actions = [
              { label: 'Equip', onClick: () => { itemEquip(items[3]); }}
            ];
            break;
        }
    });
}
import React from 'react';
import styles from "../styles/watchForm.module.css";

const ModelSelector = ({ brand, onSelectModel }) => {
  return (
    <div className={styles.modelSelectorContainer}>
      {brand.models.map((model, index) => (
        <div key={index} className={styles.modelCard}>
          <img src={model.image} alt={model.name} className={styles.modelImage} />
          <div className={styles.modelDetails}>
            <h3 className={styles.modelName}>{model.name}</h3>
            <p className={styles.modelDescription}>{model.description}</p>
            <button onClick={() => onSelectModel(model)} className={styles.selectButton}>
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelSelector;

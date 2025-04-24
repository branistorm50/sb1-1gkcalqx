/*
  # Add Sample Categories for Trades

  1. New Data
     - Sample categories for each trade to organize services

  2. Purpose
     - Populate the application with realistic category data
     - Provide structure for the service catalog
*/

-- Sample categories for Rénovation générale
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Rénovation générale'), 'Démolition', 'Démolition de murs, cloisons et structures existantes'),
  ((SELECT id FROM trades WHERE name = 'Rénovation générale'), 'Préparation de chantier', 'Installation, protection et préparation de l''espace de travail'),
  ((SELECT id FROM trades WHERE name = 'Rénovation générale'), 'Gros œuvre', 'Travaux structurels et fondations');

-- Sample categories for Second œuvre
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Second œuvre'), 'Cloisons', 'Installation de cloisons et séparations'),
  ((SELECT id FROM trades WHERE name = 'Second œuvre'), 'Plafonds', 'Plafonds suspendus et faux-plafonds'),
  ((SELECT id FROM trades WHERE name = 'Second œuvre'), 'Doublages', 'Doublages de murs et isolation');

-- Sample categories for Toiture & Couverture
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Toiture & Couverture'), 'Toiture tuiles', 'Pose et réparation de toitures en tuiles'),
  ((SELECT id FROM trades WHERE name = 'Toiture & Couverture'), 'Toiture ardoise', 'Pose et réparation de toitures en ardoise'),
  ((SELECT id FROM trades WHERE name = 'Toiture & Couverture'), 'Étanchéité', 'Travaux d''étanchéité de toiture'),
  ((SELECT id FROM trades WHERE name = 'Toiture & Couverture'), 'Zinguerie', 'Gouttières, descentes et habillages');

-- Sample categories for Isolation
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Isolation'), 'Isolation thermique', 'Isolation pour économies d''énergie'),
  ((SELECT id FROM trades WHERE name = 'Isolation'), 'Isolation phonique', 'Isolation acoustique'),
  ((SELECT id FROM trades WHERE name = 'Isolation'), 'Isolation combles', 'Isolation spécifique pour les combles');

-- Sample categories for Plomberie
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Plomberie'), 'Sanitaires', 'Installation de sanitaires'),
  ((SELECT id FROM trades WHERE name = 'Plomberie'), 'Tuyauterie', 'Installation et réparation de tuyauterie'),
  ((SELECT id FROM trades WHERE name = 'Plomberie'), 'Robinetterie', 'Installation et remplacement de robinetterie');

-- Sample categories for Électricité
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Électricité'), 'Installation générale', 'Installation électrique complète'),
  ((SELECT id FROM trades WHERE name = 'Électricité'), 'Domotique', 'Systèmes de contrôle intelligent pour la maison'),
  ((SELECT id FROM trades WHERE name = 'Électricité'), 'Éclairage', 'Installation de systèmes d''éclairage');

-- Sample categories for Peinture
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Peinture'), 'Peinture intérieure', 'Travaux de peinture pour l''intérieur'),
  ((SELECT id FROM trades WHERE name = 'Peinture'), 'Peinture extérieure', 'Travaux de peinture pour l''extérieur'),
  ((SELECT id FROM trades WHERE name = 'Peinture'), 'Préparation surfaces', 'Préparation des surfaces avant peinture');

-- Sample categories for Menuiserie
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Menuiserie'), 'Portes', 'Installation et réparation de portes'),
  ((SELECT id FROM trades WHERE name = 'Menuiserie'), 'Fenêtres', 'Installation et réparation de fenêtres'),
  ((SELECT id FROM trades WHERE name = 'Menuiserie'), 'Parquet', 'Pose et rénovation de parquets'),
  ((SELECT id FROM trades WHERE name = 'Menuiserie'), 'Placards', 'Création et installation de placards');

-- Sample categories for Carrelage & Revêtements
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Carrelage & Revêtements'), 'Carrelage sol', 'Pose de carrelage au sol'),
  ((SELECT id FROM trades WHERE name = 'Carrelage & Revêtements'), 'Faïence', 'Pose de faïence murale'),
  ((SELECT id FROM trades WHERE name = 'Carrelage & Revêtements'), 'Chape', 'Préparation et coulage de chapes');

-- Sample categories for Chauffage & Climatisation
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Chauffage & Climatisation'), 'Chauffage central', 'Installation et entretien de chauffage central'),
  ((SELECT id FROM trades WHERE name = 'Chauffage & Climatisation'), 'Climatisation', 'Installation et entretien de climatisation'),
  ((SELECT id FROM trades WHERE name = 'Chauffage & Climatisation'), 'Pompe à chaleur', 'Installation et entretien de pompes à chaleur');

-- Sample categories for Maçonnerie
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Maçonnerie'), 'Fondations', 'Création et renforcement de fondations'),
  ((SELECT id FROM trades WHERE name = 'Maçonnerie'), 'Murs', 'Construction et modification de murs'),
  ((SELECT id FROM trades WHERE name = 'Maçonnerie'), 'Ouvertures', 'Création et modification d''ouvertures');

-- Sample categories for Aménagements extérieurs
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Aménagements extérieurs'), 'Terrasses', 'Création et rénovation de terrasses'),
  ((SELECT id FROM trades WHERE name = 'Aménagements extérieurs'), 'Clôtures', 'Installation de clôtures et portails'),
  ((SELECT id FROM trades WHERE name = 'Aménagements extérieurs'), 'Pavage', 'Pose de pavés et dallages extérieurs');

-- Sample categories for VMC & Ventilation
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'VMC & Ventilation'), 'VMC simple flux', 'Installation de VMC simple flux'),
  ((SELECT id FROM trades WHERE name = 'VMC & Ventilation'), 'VMC double flux', 'Installation de VMC double flux'),
  ((SELECT id FROM trades WHERE name = 'VMC & Ventilation'), 'Gaines', 'Installation et remplacement de gaines');

-- Sample categories for Serrurerie & Métallerie
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Serrurerie & Métallerie'), 'Garde-corps', 'Fabrication et pose de garde-corps'),
  ((SELECT id FROM trades WHERE name = 'Serrurerie & Métallerie'), 'Portails', 'Fabrication et pose de portails'),
  ((SELECT id FROM trades WHERE name = 'Serrurerie & Métallerie'), 'Structures métalliques', 'Fabrication et pose de structures métalliques');

-- Sample categories for Nettoyage & Finitions
INSERT INTO categories (trade_id, name, description) VALUES
  ((SELECT id FROM trades WHERE name = 'Nettoyage & Finitions'), 'Nettoyage chantier', 'Nettoyage complet après travaux'),
  ((SELECT id FROM trades WHERE name = 'Nettoyage & Finitions'), 'Évacuation déchets', 'Évacuation et tri des déchets de chantier'),
  ((SELECT id FROM trades WHERE name = 'Nettoyage & Finitions'), 'Finitions', 'Travaux de finition et détails');
/*
  # Add Sample Services

  1. New Data
     - Add sample services for each category
     - Include realistic pricing and descriptions

  2. Purpose
     - Populate the application with useful service catalog data
     - Provide examples of properly formatted services
*/

-- Sample services for Carrelage sol category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Carrelage sol'), 
   'Pose carrelage standard format', 
   'Pose de carrelage au sol en format standard (30x30 à 45x45)', 
   'Préparation du support, pose des carreaux à la colle sur chape sèche, jointoiement et nettoyage.',
   'm²', 
   45.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Carrelage sol'), 
   'Pose carrelage grand format', 
   'Pose de carrelage au sol en grand format (60x60 et plus)', 
   'Préparation du support avec ragréage si nécessaire, pose des carreaux à la colle avec système de nivellement, jointoiement fin et nettoyage.',
   'm²', 
   65.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Carrelage sol'), 
   'Pose mosaïque sur trame', 
   'Pose de mosaïque sur trame pour sol', 
   'Préparation du support, pose soignée de la mosaïque sur trame avec ajustements des coupes, jointoiement délicat et nettoyage final.',
   'm²', 
   95.00, 
   20.0);

-- Sample services for Faïence category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Faïence'), 
   'Pose faïence murale standard', 
   'Pose de faïence murale en format standard', 
   'Préparation du support, pose droite à la colle, jointoiement et nettoyage. Inclut les coupes simples.',
   'm²', 
   55.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Faïence'), 
   'Pose faïence avec motifs', 
   'Pose de faïence murale avec motifs ou frise', 
   'Préparation du support, calepinage précis des motifs, pose à la colle avec alignement parfait, jointoiement et nettoyage soigné.',
   'm²', 
   75.00, 
   20.0);

-- Sample services for Peinture intérieure category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Peinture intérieure'), 
   'Peinture murs et plafonds', 
   'Application de peinture sur murs et plafonds intérieurs', 
   'Préparation des surfaces (ponçage, rebouchage), application d''une sous-couche et de deux couches de finition.',
   'm²', 
   25.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Peinture intérieure'), 
   'Peinture de boiseries', 
   'Application de peinture sur boiseries intérieures', 
   'Préparation minutieuse (ponçage, dégraissage), application d''une sous-couche adaptée et de deux couches de finition laque.',
   'ml', 
   18.00, 
   20.0);

-- Sample services for Électricité - Installation générale category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Installation générale'), 
   'Installation tableau électrique', 
   'Fourniture et pose d''un tableau électrique complet', 
   'Installation d''un tableau électrique conforme aux normes NF C 15-100, avec disjoncteur différentiel principal, répartiteur et protections. Test de fonctionnement inclus.',
   'unité', 
   850.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Installation générale'), 
   'Création point lumineux', 
   'Création d''un point lumineux avec interrupteur', 
   'Percement, passage des câbles, pose boîtier, raccordement au tableau et test. Inclut la fourniture du matériel électrique (hors luminaire).',
   'unité', 
   120.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Installation générale'), 
   'Installation prise électrique', 
   'Fourniture et pose d''une prise électrique', 
   'Percement, passage des câbles, pose boîtier, raccordement au tableau et test. Inclut la prise et la plaque de finition.',
   'unité', 
   85.00, 
   20.0);

-- Sample services for Plomberie - Sanitaires category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Sanitaires'), 
   'Installation WC suspendu', 
   'Fourniture et pose d''un WC suspendu complet', 
   'Installation du bâti-support, raccordement aux évacuations et à l''arrivée d''eau, pose de la cuvette et du mécanisme de chasse, test d''étanchéité.',
   'unité', 
   950.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Sanitaires'), 
   'Installation lavabo', 
   'Fourniture et pose d''un lavabo avec robinetterie', 
   'Fixation du lavabo, raccordement à l''évacuation et aux arrivées d''eau, pose de la robinetterie, test d''étanchéité et de fonctionnement.',
   'unité', 
   650.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Sanitaires'), 
   'Installation douche à l''italienne', 
   'Création d''une douche à l''italienne complète', 
   'Création du receveur maçonné avec forme de pente, étanchéité, siphon de sol, raccordements, pose de la robinetterie et de la paroi de douche.',
   'forfait', 
   2500.00, 
   20.0);

-- Sample services for Menuiserie - Portes category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Portes'), 
   'Pose porte intérieure standard', 
   'Fourniture et pose d''une porte intérieure', 
   'Pose du bâti, ajustement, fixation, pose des chambranles, de la porte et de la quincaillerie. Inclut les finitions périphériques.',
   'unité', 
   580.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Portes'), 
   'Installation porte d''entrée sécurisée', 
   'Fourniture et pose d''une porte d''entrée haute sécurité', 
   'Dépose de l''ancienne porte, préparation de l''ouverture, pose du bâti, de la porte, des systèmes de fermeture sécurisés et finitions.',
   'unité', 
   2200.00, 
   20.0);

-- Sample services for Menuiserie - Fenêtres category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Fenêtres'), 
   'Pose fenêtre double vitrage PVC', 
   'Fourniture et pose d''une fenêtre PVC double vitrage', 
   'Dépose de l''ancienne fenêtre, préparation, pose, réglage, calfeutrement et finitions. Dimensions standard jusqu''à 120x120 cm.',
   'unité', 
   790.00, 
   20.0),
   
  ((SELECT id FROM categories WHERE name = 'Fenêtres'), 
   'Pose fenêtre aluminium', 
   'Fourniture et pose d''une fenêtre aluminium', 
   'Dépose de l''ancienne fenêtre, préparation, pose, réglage, calfeutrement et finitions. Dimensions standard jusqu''à 120x120 cm.',
   'unité', 
   990.00, 
   20.0);

-- Sample services for Isolation thermique category
INSERT INTO services (category_id, name, description, technical_details, unit, price, tax_rate) VALUES
  ((SELECT id FROM categories WHERE name = 'Isolation thermique'), 
   'Isolation murs par l''intérieur', 
   'Isolation thermique des murs par l''intérieur', 
   'Pose d''ossature métallique, isolation en laine minérale haute performance, pose de pare-vapeur et finition plaque de plâtre (hors finition peinture).',
   'm²', 
   75.00, 
   5.5),
   
  ((SELECT id FROM categories WHERE name = 'Isolation thermique'), 
   'Isolation combles perdus', 
   'Isolation thermique de combles non aménagés', 
   'Préparation du plancher, pose de pare-vapeur si nécessaire, soufflage ou déroulage d''isolant haute performance, création de chemin d''accès.',
   'm²', 
   45.00, 
   5.5);

-- Add service options for Carrelage
INSERT INTO service_options (service_id, option_type, name, values) VALUES
  ((SELECT id FROM services WHERE name = 'Pose carrelage standard format'), 
   'material', 
   'Type de carrelage', 
   ARRAY['Grès cérame', 'Grès émaillé', 'Terre cuite']),
   
  ((SELECT id FROM services WHERE name = 'Pose carrelage standard format'), 
   'finish', 
   'Finition des joints', 
   ARRAY['Standard', 'Époxy', 'Étanche']),
   
  ((SELECT id FROM services WHERE name = 'Pose carrelage grand format'), 
   'dimension', 
   'Format', 
   ARRAY['60x60 cm', '80x80 cm', '100x100 cm']);

-- Add service options for Peinture
INSERT INTO service_options (service_id, option_type, name, values) VALUES
  ((SELECT id FROM services WHERE name = 'Peinture murs et plafonds'), 
   'finish', 
   'Finition', 
   ARRAY['Mate', 'Satinée', 'Brillante']),
   
  ((SELECT id FROM services WHERE name = 'Peinture murs et plafonds'), 
   'color', 
   'Base de couleur', 
   ARRAY['Blanc', 'Pastel', 'Vive', 'Foncée']);

--Definitions

CREATE TABLE category (
    id    SERIAL PRIMARY KEY,    
    title     TEXT NOT NULL,
    description    TEXT,        
    color TEXT DEFAULT '#000000',
    created_at DATE,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallet (
    id    SERIAL PRIMARY KEY,
    id_category INT DEFAULT 0,    
    title     TEXT NOT NULL,
    description    TEXT,    
    color TEXT DEFAULT '#000000',
    amount REAL NOT NULL DEFAULT 0,
    created_at DATE,
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON COLUMN wallet.category is 'For example BBVA you have some sections, to group by category';
ALTER TABLE wallet ADD FOREIGN KEY(id_category) REFERENCES category (id) ON UPDATE CASCADE;

CREATE TABLE daily (
    id    SERIAL PRIMARY KEY,
    type TEXT DEFAULT NULL,
    color TEXT DEFAULT '#000000',
    title     TEXT NOT NULL,
    description    TEXT,    
    amount REAL NOT NULL DEFAULT 0,
    created_at DATE,
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON COLUMN wallet.category is 'Can be entry or expense';

CREATE TABLE _transaction (
    id    SERIAL PRIMARY KEY,
    id_wallet INTEGER NOT NULL,
    id_daily INTEGER NOT NULL,
    type TEXT DEFAULT NULL,
    color TEXT DEFAULT '#000000',
    title     TEXT NOT NULL,
    description    TEXT,    
    amount REAL NOT NULL DEFAULT 0,
    created_at DATE,
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE _transaction ADD FOREIGN KEY(id_wallet) REFERENCES wallet (id) ON DELETE CASCADE;
ALTER TABLE _transaction ADD FOREIGN KEY(id_daily) REFERENCES daily (id) ON DELETE CASCADE;


--Functions
DROP FUNCTION IF EXISTS getCategories;
CREATE OR REPLACE FUNCTION getCategories( IN _id INT DEFAULT NULL)
  RETURNS TABLE (
    id    INT,    
    color TEXT,
    title TEXT,
    description TEXT          
  ) 
  AS $$ BEGIN  
    RETURN QUERY
      SELECT category.id, category.title, category.description, category.color
      FROM public.category
      WHERE (CASE WHEN _id IS NOT NULL THEN category.id = _id END)
      ORDER BY category.title;      
  END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS getWallets;
CREATE OR REPLACE FUNCTION getWallets( IN _id_category INT DEFAULT NULL, _id_wallet INT DEFAULT NULL )
  RETURNS TABLE (
    id    INT,
    id_category INT,    
    title TEXT,
    description TEXT,
    color TEXT,
    amount INT,
    updated_at TIMESTAMP 
  ) 
  AS $$ BEGIN  
    RETURN QUERY
      SELECT wallet.id, wallet.id_category, wallet.title, wallet.description, wallet.color, wallet.amount, wallet.updated_at
      FROM public.wallet
      WHERE (CASE WHEN _id_wallet IS NOT NULL THEN wallet.id = _id_wallet END)
      AND (CASE WHEN _id_category IS NOT NULL THEN wallet.id_category = _id_category END)
      GROUP BY wallet.id_category
      ORDER BY wallet.title;      
  END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS getTransactions;
CREATE OR REPLACE FUNCTION getTransactions( IN _id_transaction INT DEFAULT NULL, _id_wallet INT DEFAULT NULL)
  RETURNS TABLE (
    id    INT,
    id_wallet INT,
    id_daily INT,
    type TEXT,
    color TEXT,
    title TEXT,
    description TEXT,    
    amount REAL,
    created_at DATE,
    updated_at TIMESTAMP  
  ) 
  AS $$ BEGIN  
    RETURN QUERY
      SELECT 
        _transaction.id, _transaction.id_wallet, _transaction.id_daily,
        _transaction.type, _transaction.color, _transaction.title, _transaction.description,
        _transaction.amount, _transaction.created_at, _transaction.updated_at
      FROM public._transaction
      WHERE (CASE WHEN _id_transaction IS NOT NULL THEN _transaction.id = _id_transaction END)
      AND (CASE WHEN _id_wallet IS NOT NULL THEN _transaction.id_wallet = _id_wallet END)
      GROUP BY _transaction.id_wallet
      ORDER BY _transaction.created_at;      
  END;
$$ LANGUAGE PLpgSQL;
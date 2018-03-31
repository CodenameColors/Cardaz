WITH data(first_name, last_name, phone_number, mi, street, city, state, zipcode, bpm, raw_heart_data) AS (
VALUES(text 'antonio', text 'morales', text '9785906458', char ' ', 
	text '115 nutmeg ln', text 'East Hartford', text 'CT', integer '06118', 
	integer '72', bytea '000/000/110')
)
, ins1 AS (
	INSERT INTO patient(first_name, last_name, phone_number, mi)
	SELECT first_name, last_name, phone_number, mi FROM data
	ON 	CONFLICT DO NOTHING
	RETURNING id AS p_id
)
, ins2 AS (
	INSERT INTO address(p_id, street, city, state, zipcode)
	SELECT street, city, state, zipcode FROM data
	JOIN ins1 USING p_id
	RETURNING p_id
	)
)

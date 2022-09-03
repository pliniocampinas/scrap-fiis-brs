update scrapped_assets set city = 'Campinas' 
where city = 'Campinas - SP';

update scrapped_assets set city = 'Anápolis' 
where city = 'Anápolis - GO';

update scrapped_assets set city = 'Guarulhos' 
where city = 'Guarulhos - SP';

update scrapped_assets set city = 'Uberlândia' 
where city = 'Uberlândia - MG';

update scrapped_assets set city = '' 
where city = 'São Paulo, Minas Gerais, Paraná e Santa Catarina';

update scrapped_assets set neighborhood = '' 
where neighborhood = 'Bairro:';

update scrapped_assets set city = 'Salvador' 
where city = 'Salvador - BA';

update scrapped_assets set neighborhood = 'Liberdade' 
where neighborhood = 'São Paulo/SP'
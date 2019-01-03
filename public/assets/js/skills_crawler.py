'''import json
from bs4 import BeautifulSoup
import re
import requests
import urllib

path="http://bddatabase.net"

with open('data.json') as f:
	data=json.load(f)

urls_array= data['aaData']
notin =['Black Spirit Illusion','Call of the Lord','Call to Battle','Cannon Attack','Command to Gather','Emergency Escape','Experienced Cry','Flute Buff','Local Economy Revitalization','Make Bonfire','Money Maker','Horse Roar','Imperial Calling','Indomitable Flag','Guild Squad Special Attack','Fully Prepared','Revive Target','Rage Absorption','Flute Buff','Fury Transfer',"Killer Training","Shining Blade"]

inbut=["Awakening","Brace","Corrupt","Fatal Wind","Flow: Doppel Dummy","Flow: Fatal Blow Combo","Flow: Sky Stepping","Ghost Step","Ninjutsu: Block Jump",'Kunai',"Infinite Mastery","Skilled Hunter"]
with open('data_test.json', 'a') as f:  
	for i in range(0,len(urls_array)):
		eff=[]
		type_att=[]
		url = path+urls_array[i][0]
		source=requests.get(url).content
		soup=BeautifulSoup(source, 'html.parser')
		table=soup.find('table',{'class':'smallertext'})
		title=table.findAll('td',{'class':'titles_cell'})[0]

		if "Lv." not in title.text:
			if title.text not in notin:
				print title.text
				ih=title.parent.parent.find('td',{'class','icon_cell'})
				i_src=ih.find('img')['src']
				i_src_url=path+i_src
				urllib.urlretrieve(i_src_url,'icons/'+title.text+'.png')
				print title.text
					body=title.parent.parent
					trs=body.findAll('tr')
					if("Shuriken Throw" in title.text):
						infos=trs[7]
					elif("Suicide Fall" in title.text):
						infos=trs[9]
					else:
						infos=trs[10]

					vals = infos.findAll('span',{'style':'color: #e9bd23'})
					atts = infos.findAll('span',{'style':'color: #61d8ff'})
					for att in atts:
						type_att.append(att.text)
					for info in vals:
						if not re.search(r'\d', info.text):
							eff.append(info.text)
					ok={
						'name':title.text,
						'type_attack':type_att,
						'effect':eff
					}'''
					#json.dump(ok, f)
			
'''
import json
from bs4 import BeautifulSoup
import re
import requests
import urllib

path="http://bddatabase.net"

with open('b.json') as f:
	data=json.load(f)

all=[]
with open('ninja.json', 'a') as f:  
	for skill in data:
		name= skill['name']
		control=skill['control']#html
		if control != "Passive":
			cooldown= skill['time']
			html=skill['desc2']#html
			soup=BeautifulSoup(html,'html.parser')
			vals=soup.findAll('font',{'color':'#e9bd23'})
			vals2 = soup.findAll('font',{"color":"#61d8ff"})
			lvl_need = skill['pclevelneed']
			equip = skill['equip']
			eff=[]
			eff2=[]
			for val in vals:
				if not re.search(r'\d',val.text):
					eff.append(val.text)
			vals2 = soup.findAll('font',{"color":"#61d8ff"})
			for val2 in vals2:
				if not re.search(r'\d',val2.text):
					eff2.append(val2.text)
			if len(eff) != 0 or len(eff2) != 0:
				if equip == "2":
					e="2"
				else:
					e="1"
				ok={
					"name":name,
					"control":control,
					"cooldown":cooldown,
					"lvl_needed":lvl_need,
					"equip":e,
					"cc_type":eff,
					"atk_type":eff2
				}
				all.append(ok)
			
				
			
	json.dump(all, f)
'''

#intro get table to json and clean to get only links from the website and add "urls" as table title and use it (get from html edit code to get all skills in one table) http://convertjson.com/html-table-to-json.htm
import json
from bs4 import BeautifulSoup
import re
import requests
import urllib

path="http://bddatabase.net"

with open('intro_ninja.json') as f:
	data=json.load(f)

urls_array= data['urls']
#print(urls_array[0]["Title"])
with open('ninja.json', 'a') as f:
	for i in range(0,len(urls_array)):
		eff=[]
		type_att=[]
		eff2=[]
		req_lvl=""
		url = path+urls_array[i]["Title"]
		source=requests.get(url).content
		soup=BeautifulSoup(source, 'html.parser')
		table=soup.find('table',{'class':'smallertext'})
		title=table.findAll('td',{'class':'titles_cell'})[0]

		'''ih=title.parent.parent.find('td',{'class','icon_cell'})
		i_src=ih.find('img')['src']
		i_src_url=path+i_src
		urllib.urlretrieve(i_src_url,'../img/ninja/'+title.text.replace(":", "-")+'.png')'''

		body=title.parent.parent
		trs=body.findAll('tr')

		#print trs[4]
		#print "--------------"
		infos2 = trs[4]
		#infos=trs[8]
		infos = body.findAll("div", {"id": "description"})[0]
		vals = infos.findAll('span',{'style':'color: #e9bd23'})
		atts = infos.findAll('span',{'style':'color: #61d8ff'})
		req_lvls = infos2.findAll("span",{'style': 'color: #E49800'})

		for att in atts:
			type_att.append(att.text)
		for info in vals:
			if not re.search(r'\d', info.text):
				eff.append(info.text)
		if req_lvls:
			for lvl in req_lvls:
				req_lvl=lvl.text

		ok={
			'name':title.text.replace(":", "-"),
			'type_attack':type_att,
			'effect':eff,
			'req_lvl':req_lvl
		}
		print ok
		print '----------'
		json.dump(ok, f)
	

'''
				body=title.parent.parent
				trs=body.findAll('tr')
				if("Shuriken Throw" in title.text):
					infos=trs[7]
				elif("Suicide Fall" in title.text):
					infos=trs[9]
				else:
					infos=trs[10]
				
				vals = infos.findAll('span',{'style':'color: #e9bd23'})
				atts = infos.findAll('span',{'style':'color: #61d8ff'})
				for att in atts:
					type_att.append(att.text)
				for info in vals:
					if not re.search(r'\d', info.text):
						eff.append(info.text)
				ok={
					'name':title.text,
					'type_attack':type_att,
					'effect':eff
				}
				json.dump(ok, f)'''
# ml-seminar

# be
how to run ?
# With custom model in api.py
- install python 3
- cd be folder
- run `pip install flask sentence_transformers torch flask_cors`
- run `python api.py` -> port 5000, should change port if run in mac
# With GPT
- create .env file and put your api key with:
```OPENAI_API_KEY=YOUR_API_KEY```
- install nodejs
- run `npm i`
- `node gpt.js <query>`

# fe
only working with custom model in api.py
how to run ?
- cd fe
- npm i
- npm run start

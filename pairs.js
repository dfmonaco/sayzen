// I need help to write script that:
// 1. will merge the objects from both files mp_gemini and mp_claude
// 2. find the entries with a duplicated id, and show me both entries and let me chose wich on to keep (the idea is to remove all duplicates)
// 3. sort the entries by difficulty entry in this order: 'hard', 'medium', 'easy'
// 4. add a new key for all the objects that will be an incremental integer starting from 1 and respecting the previous sorting
// and put the result into a new json file called  minimal_pairs.json

let mp_gemini = require('./minimal_pairs_gemini.json')
let mp_claude = require('./minimal_pairs_claude.json')

// This is an example of the json structure that is inside the previous files:

[
  {
    "id": "think-sink",
    "contrast": {
      "label": "/θ/ vs /s/",
      "sound_a": "θ",
      "sound_b": "s"
    },
    "difficulty": "hard",
    "pair": [
      {
        "word": "think",
        "definition": "To use one's mind to consider or reason about something.",
        "segments": [
          { "highlight": true, "letters": "th" },
          { "highlight": false, "letters": "ink" }
        ],
        "phonetic": {
          "text": "/θɪŋk/",
          "segments": [
            { "highlight": true, "letters": "θ" },
            { "highlight": false, "letters": "ɪŋk" }
          ]
        },
        "audio": "audio/think.mp3"
      },
      {
        "word": "sink",
        "definition": "To go down below the surface of something, especially of a liquid.",
        "segments": [
          { "highlight": true, "letters": "s" },
          { "highlight": false, "letters": "ink" }
        ],
        "phonetic": {
          "text": "/sɪŋk/",
          "segments": [
            { "highlight": true, "letters": "s" },
            { "highlight": false, "letters": "ɪŋk" }
          ]
        },
        "audio": "audio/sink.mp3"
      }
    ]
  },
  {
    "id": "bat-pat",
    "contrast": {
      "label": "/b/ vs /p/",
      "sound_a": "b",
      "sound_b": "p"
    },
    "difficulty": "medium",
    "pair": [
      {
        "word": "bat",
        "definition": "A wooden stick used in baseball or cricket.",
        "segments": [
          { "highlight": true, "letters": "b" },
          { "highlight": false, "letters": "at" }
        ],
        "phonetic": {
          "text": "/bæt/",
          "segments": [
            { "highlight": true, "letters": "b" },
            { "highlight": false, "letters": "æt" }
          ]
        },
        "audio": "audio/bat.mp3"
      },
      {
        "word": "pat",
        "definition": "To touch gently with the hand.",
        "segments": [
          { "highlight": true, "letters": "p" },
          { "highlight": false, "letters": "at" }
        ],
        "phonetic": {
          "text": "/pæt/",
          "segments": [
            { "highlight": true, "letters": "p" },
            { "highlight": false, "letters": "æt" }
          ]
        },
        "audio": "audio/pat.mp3"
      }
    ]
  }
]

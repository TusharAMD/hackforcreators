from flask import Flask,request
from flask_cors import CORS,cross_origin
import json
import pymongo
import imgbbpy
import pymongo
import praw

app = Flask(__name__)
CORS(app)


@app.route("/api/uploadmeme/",methods=["GET","POST"])
@cross_origin()
def uploadMeme():
    if request.method == "POST":

        ## Database ##
        client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/?retryWrites=true&w=majority")
        db = client["hackforcreators"]
        col = db["uploadedmemes"]
        ## ******** ##

        imgFilename = request.files['file'].filename
        request.files['file'].save(imgFilename)
        jsonData = json.loads(request.files['jsondata'].read().decode('utf-8'))

        client = imgbbpy.SyncClient('fb13020baf1e55ab0f8abe7be3834531')
        image = client.upload(file=imgFilename)
        print(image.url)

        jsonData["file"] = image.url

        x = col.insert_one(jsonData)

        print(x.inserted_id)

        return {"Obj ID":x.inserted_id}

@app.route("/api/getMeme/",methods=["GET","POST"])
@cross_origin()
def getMeme():
    if request.method == "POST":

        ## Database ##
        client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/?retryWrites=true&w=majority")
        db = client["hackforcreators"]
        col = db["uploadedmemes"]
        ## ******** ##

        ## Reddit ##
        reddit = praw.Reddit(client_id ='FOWvvow8Chjiwl0yHjEmDA',
                     client_secret ='dWEykrdivnfu92duZOjedMBsRG6pMQ',
                     user_agent ='user agent')
        subreddit = reddit.subreddit('SaimanSays')
        ## ****** ##

        tags = request.json["tags"]
        print(tags)

        memesDB = []
        for x in col.find():
            del x["_id"]
            print(x)
            memesDB.append(x)

        memesDB.sort(key=lambda x: sortfun(x,tags),reverse=True)
        print(memesDB)
        
        ### Reddit Posts Retrieval ###
        redditposts = []
        for submission in subreddit.hot(limit=2):
            cnt= 0
            print(submission.title)
            tempdict = {"Post Title":submission.title,"Comments":[]}
            for top_level_comment in submission.comments:
                tempdict["Comments"].append(top_level_comment.body)
                cnt+=1
                if cnt>5:
                    break
            redditposts.append(tempdict)
        ### ********************** ###


    return {"data":memesDB,"redditposts":redditposts}

def sortfun(x,tags):
    return len(list(set(x['tags']) & set(tags))) 


if __name__ == "__main__":
    app.run(debug=True)
import praw
import pprint
reddit = praw.Reddit(client_id ='FOWvvow8Chjiwl0yHjEmDA',
                     client_secret ='dWEykrdivnfu92duZOjedMBsRG6pMQ',
                     user_agent ='user agent')
subreddit = reddit.subreddit('SaimanSays')

redditposts = []

for submission in subreddit.hot(limit=5):
    print(submission.title)
    tempdict = {"Post Title":submission.title,"Comments":[]}
    for top_level_comment in submission.comments:
        #print(top_level_comment.body)
        tempdict["Comments"].append(top_level_comment.body)
    redditposts.append(tempdict)

    
    
pprint.pprint(redditposts)

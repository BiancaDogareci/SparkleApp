import db from '../../models/index.js';

export const attachLabelsToPost = async (postId, labels) => {
    const post = await db.Post.findOne({ where: { id: postId } });
    if (!post) return false;

    const labelsToAdd = await Promise.all(
        labels.map(async (label) => {
            const foundLabel = await db.Label.findOne({ where: { name: label } });
            if (!foundLabel) {
                const createdLabel = await db.Label.create({
                  name: label,
                  usage: 0,
              });
              return createdLabel;
            } else {
                const usage = foundLabel.usage + 1;
                const updatedLabel = await foundLabel.update({ usage });
                return updatedLabel;
              }
         })
     );

    await post.setLabels(labelsToAdd);
    return true;
};

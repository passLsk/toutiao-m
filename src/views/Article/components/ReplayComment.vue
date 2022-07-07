<template>
  <div class="comment">
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left> <van-icon name="cross" /> </template
    ></van-nav-bar>
    <CommentItem :item="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="(item, index) in list"
      :key="index"
    ></CommentItem>
    <div class="bottom">
      <van-button
        plain
        type="primary"
        block
        round
        class="btn"
        @click="isAddcommentShow = true"
        >评论</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddcommentShow">
      <AddComment :target="comment.com_id"
      :art_id="$route.params.article_id"
      v-if="isAddcommentShow"
        @add-comment="
          list.unshift($event);
          isAddcommentShow = false;
          comment.reply_count++
        "></AddComment>
    </van-popup>
  </div>
</template>
<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem'
import AddComment from './AddComment.vue'
export default {
  name: 'ReplyComment',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: 'c',
        source: this.comment.com_id,
        offset: null,
        limit: 99999
      },
      list: [],
      isAddcommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        this.list = res.data.data.results
        console.log('回复评论', res, this.list)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  padding: 92px 0 110px 0;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 750px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
  .btn {
    border: 0;
    color: skyblue;
  }
}
</style>

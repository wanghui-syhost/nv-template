<template>
    <div>
      <nv-uploader
        :uploadURL = "uploadURL"
        :projectName= "projectName" 
        :projectId="projectId" 
        :type="type"></nv-uploader>
    </div>
</template>

<script>
export default {
  data() {
    return {
      uploadURL: "api/file/upload",
      projectId: "736",
      projectName: "茂名水治理项目",
      type: "drwing"
    };
  }
};
</script>

package com.webviewanalytics

import android.content.Context
import android.webkit.JavascriptInterface
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONObject
import java.net.URLDecoder

// the context is used only for showing UI toast message for logging
class TestJavascriptInterface(private val context: Context) {

    @JavascriptInterface
    fun sendJsEvent(jsonData: String) {
        print("send event from web: $jsonData")
        processJsonAndSendEvent(jsonData)
    }

    private fun processJsonAndSendEvent(jsonData: String) {
        val dataArray = JSONArray(URLDecoder.decode(jsonData, "UTF-8"))
        val methodName = dataArray.getString(0)
        val args = dataArray.getJSONArray(1)
        val eventPath = args.getString(0)
        val eventDesc = args.getString(1)
        val eventType = args.getString(2)
        val customData = args.getJSONObject(3)

        when (methodName) {
            "triggerActivityStartEvent" -> triggerActivityStartEvent(
                eventPath,
                eventDesc,
                eventType,
                customData
            )
            "triggerButtonClickEvent" -> triggerButtonClickEvent(
                eventPath,
                eventDesc,
                eventType,
                customData
            )
            "triggerSearchEvent" -> triggerSearchEvent(
                eventPath,
                eventDesc,
                eventType,
                customData)
        }

        // UI Toast
        Toast.makeText(context, methodName, Toast.LENGTH_LONG).show()
    }

    private fun triggerActivityStartEvent(
        eventPath: String?,
        eventDesc: String?,
        eventType: String?,
        customData: JSONObject?) {

        //TODO build event and send
    }

    private fun triggerButtonClickEvent(
        eventPath: String?,
        eventDesc: String?,
        eventType: String?,
        customData: JSONObject?) {

        //TODO build event and send
    }

    private fun triggerSearchEvent(
        eventPath: String?,
        eventDesc: String?,
        eventType: String?,
        customData: JSONObject?) {

        //TODO build event and send
    }
}